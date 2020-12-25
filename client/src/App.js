import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Error from "./pages/Error"
import Header from "./components/Header";

import Auth from './pages/Auth'
import ProjectsPage from './pages/ProjectsPage'
function App() {
  return (

      <div class="container is-max-desktop">
        <Header/>
          <Switch>
            <Route exact path="/" component={ProjectsPage}/>
            <Route path="/auth" component={Auth}/>
            <Route component={Error} />

          </Switch>

      </div>

  );
}

export default App;
