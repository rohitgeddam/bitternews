import ProjectListItem from './ProjectListItem'

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
    return (
  
        <div>
            { projectList.map( item =>
            <ProjectListItem 
            title={item.title}
            description={item.description}
            postedBy={item.postedBy}
            voteCount={item.voteCount }/> )}
            
            
        </div>
  
    );
  }
  
  export default ProjectList;
  