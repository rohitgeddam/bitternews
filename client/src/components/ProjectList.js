import { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router';
import { useQuery, useMutation, gql } from '@apollo/client';

import UserContext from '../UserContext'

import ProjectListItem from './ProjectListItem'



const VOTE_PROJECT_MUTATION = gql`
    mutation voteProject($projectId: ID!) {
        voteProject( projectId: $projectId) {
            status
            message
            
        }

    }


`

function ProjectList({projectList, refetchList }) {
 
    const { user, setUser } = useContext(UserContext);
    const [error, setError] = useState({isError: false, message: ''});
    const [upVoteProject, { loading, data }] = useMutation(VOTE_PROJECT_MUTATION,{
       
        onCompleted: ({voteProject}) => {

            if(voteProject.status !== 'Success'){
                // error
                setError({isError:true, message:voteProject.message})
            } else {
                // success
                refetchList()
            }


            
        }
        
         
      })

 

    const history = useHistory();

    const checkLogin = () => {
        if (!user) {
          return false
        }
        return true
      }

      const upVote = (projectId) => {
        // execute mutation with id
        // check if login
        if(checkLogin()) {
          console.log("VO")
          upVoteProject({variables: {projectId: projectId}})

        }
        else {

          history.push('/auth/signin')
        }
        
      }
      if(loading) {
        return <>Loading...</>
    }

 


    return (
  
        <div>
            <div class="project-list-item__error">
            { error.isError && <><p>{error.message}</p> </>}
            </div>
            { projectList && projectList.map( (item, i) =>
            <ProjectListItem 
            key={i}
            projectId={item.id}
            title={item.title}
            description={item.description}
            postedOn={item.postedOn}
            postedBy={item.postedBy.username}
            voteCount={item.voteCount }
            upVote={upVote}

            /> )
            
            }
            

            
        </div>
  
    );
  }
  
  export default ProjectList;
  