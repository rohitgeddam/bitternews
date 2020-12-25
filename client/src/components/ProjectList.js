import { useQuery, gql } from '@apollo/client';
import { useState } from 'react'

import ProjectListItem from './ProjectListItem'

const GET_ALL_PROJECTS = gql`
  query GetAllProjects {
    allProjects(page: 1, limit: 2, sortBy: POPULARITY) {
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


const projectList = [
    {
        title: "Clone Uber",
        description: "develope an uber clone with mobile and desktop panels",
        postedBy: "rohitgeddam2018",
        voteCount: 30,
    },
    
    {
        title: "Clone Snapchat",
        description: "develope an uber clone with mobile and desktop panels",
        postedBy: "rohitgeddam2018",
        voteCount: 20,
    },
    {
        title: "Clone Airbnb",
        description: "develope an uber clone with mobile and desktop panels",
        postedBy: "rohitgeddam2018",
        voteCount: 15,

    },
    {
        title: "Clone tango",
        description: "develope an uber clone with mobile and desktop panels",
        postedBy: "rohitgeddam2018",
        voteCount: 10,
    },
    {
        title: "Clone Django",
        description: "develope an uber clone with mobile and desktop panels",
        postedBy: "rohitgeddam2018",
        voteCount: 12,
    },
]

function ProjectList() {
 
    const { loading, error, data } = useQuery(GET_ALL_PROJECTS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;



    return (
  
        <div>
            { data.allProjects.docs.map( (item, i) =>
            <ProjectListItem 
            key={i}
            title={item.title}
            description={item.description}
            postedOn={item.postedOn}
            postedBy={"rohitgeddam"}
            voteCount={item.voteCount }

            /> )
            
            }
            

            
        </div>
  
    );
  }
  
  export default ProjectList;
  