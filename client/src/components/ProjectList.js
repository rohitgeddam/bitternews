import { useState, useEffect } from 'react'

import ProjectListItem from './ProjectListItem'





function ProjectList({projectList}) {
 
   

    return (
  
        <div>
            { projectList && projectList.map( (item, i) =>
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
  