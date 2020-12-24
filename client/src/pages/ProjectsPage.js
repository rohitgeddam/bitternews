import ProjectList from '../components/ProjectList'

import '../styles/project-page.scss'
function ProjectsPage() {
  return (

      <div class="box">
        <h1 class="title">Projects</h1>
        {/* <h2 class="subtitle">Subtitle</h2> */}
        <ProjectList/>
      </div>

  );
}

export default ProjectsPage;
