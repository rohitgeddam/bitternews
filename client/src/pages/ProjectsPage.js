import { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';

import ProjectList from '../components/ProjectList'
import Paginator from '../components/Paginator'
import '../styles/project-page.scss'



const GET_ALL_PROJECTS = gql`
  query GetAllProjects($page: Int, $limit: Int, $sortBy: SortBy ) {
    allProjects(page: $page, limit: $limit, sortBy: $sortBy) {
        docs {
            title
            description
            postedOn
            voteCount
        }
        totalDocs
        limit
        totalPages
        page
        pagingCounter
        hasPrevPage
        hasNextPage
        prevPage
        nextPage
  
        }
    }
`;

const SORTBY = {
  1: 'POPULARITY',
  2: 'OLDEST',
  3: 'LATEST',

}

function ProjectsPage() {
  const [sortOptions, setSortOptions] = useState({page: 1, limit: 2, sortBy: SORTBY[1]})

  const { loading, error, data, refetch } = useQuery(GET_ALL_PROJECTS, {
    variables: sortOptions
  });


  useEffect( () => {
    console.log(data);
  })


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const getNextPage = () => {
    console.log("NEXT")
    setSortOptions( state => {
      return {page: state.page + 1}
    })
    console.log(sortOptions)
  }

  const getPrevPage = () => {
    console.log("PREV")
    setSortOptions( state => {
      return {page: state.page - 1}
    })
    console.log(sortOptions)
  }

  const sortOptionChange = (e) => {
    console.log("CHANGES", e.target.value)
    setSortOptions({sortBy: e.target.value})
    console.log(sortOptions)

  }
 
  return (

      <div class="box project-page__box">

        <div class="project-page__header">
          <h1 class="title">Projects</h1>

            <div class="select">
              <select onChange={sortOptionChange}>
                <option value={SORTBY[1]}>Popular</option>
                <option value={SORTBY[2]}>Oldest</option>
                <option value={SORTBY[3]}>Latest</option>
              </select>

          </div>
        </div>
        

        {/* <h2 class="subtitle">Subtitle</h2> */}
        { data && 
        <>
          <ProjectList projectList={data.allProjects.docs} />
          <Paginator paginatorDetails={ {
            hasNextPage: data.allProjects.hasNextPage,
            hasPrevPage: data.allProjects.hasPrevPage,
            page: data.allProjects.page,
            totalPages: data.allProjects.totalPages,
          } }
          paginatorControlls= {{
              getNextPage,
              getPrevPage
          } }/>
        </>
        }
        
      </div>

  );
}

export default ProjectsPage;
