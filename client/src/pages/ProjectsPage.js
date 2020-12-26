import { useState, useEffect, useContext } from 'react';
import { useQuery, gql } from '@apollo/client';

import ProjectList from '../components/ProjectList'
import Paginator from '../components/Paginator'
import AddProjectModal from '../components/AddProjectModal'
import UserContext from '../UserContext'
import '../styles/project-page.scss'



const GET_ALL_PROJECTS = gql`
  query GetAllProjects($page: Int, $limit: Int, $sortBy: SortBy ) {
    allProjects(page: $page, limit: $limit, sortBy: $sortBy) {
        docs {
            id
            title
            description
            postedOn
            voteCount
            postedBy {
              username
            }
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
  const { user, setUser } = useContext(UserContext);
  const [sortOptions, setSortOptions] = useState({page: 1, limit: 10, sortBy: SORTBY[1]})
  const [modalIsOpen, setIsOpen] = useState(false);

  const { loading, error, data, refetch } = useQuery(GET_ALL_PROJECTS, {
    variables: sortOptions
  });





  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const getNextPage = () => {

    setSortOptions( state => {
      return {...sortOptions, page: state.page + 1}
    })
    console.log(sortOptions)
  }

  const getPrevPage = () => {

    setSortOptions( state => {
      return {...sortOptions, page: state.page - 1}
    })
    console.log(sortOptions)
  }

  const sortOptionChange = (e) => {

    setSortOptions({...sortOptions, sortBy: e.target.value})
    console.log(sortOptions)

  }


  function openModal() {
    setIsOpen(true);
  }
 
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    console.log("I am open now")
  }
 
  function closeModal(){
    setIsOpen(false);
  }

 
  return (

      <div class="box project-page__box">
        <AddProjectModal
          isOpen={modalIsOpen}
          afterOpenModal={afterOpenModal}
          closeModal={closeModal}
          refetch={refetch}
        />
        <div class="project-page__header">
          <h1 class="title">Projects
          {
            user &&
            <span
            class="project-page__header__addbtn"
            onClick={openModal}
           >
             +
           </span>
          }
         
          </h1>

            <div class="select">
              <select onChange={sortOptionChange} selected={sortOptions.sortBy} value={sortOptions.sortBy}>
                <option value={SORTBY[1]}>Popular</option>
                <option value={SORTBY[2]}>Oldest</option>
                <option value={SORTBY[3]}>Latest</option>
              </select>

          </div>
        </div>
        

        {/* <h2 class="subtitle">Subtitle</h2> */}
        { data && 
        <>
          <ProjectList projectList={data.allProjects.docs} refetchList={refetch} />
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
