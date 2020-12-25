import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Error from "./pages/Error"
import Header from "./components/Header";

import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProjectsPage from './pages/ProjectsPage'
function App() {
  return (

      <div class="container is-max-desktop">
        <Header/>
          <Switch>
            <Route exact path="/" component={ProjectsPage}/>
            <Route path="/auth/signin" component={LoginPage}/>
            <Route path="/auth/signup" component={RegisterPage}/>
            <Route component={Error} />
            {/* <Route
              path='/dashboard'
              render={(props) => (
                <Dashboard {...props} isAuthed={true} />
              )}
            /> */}
          </Switch>

      </div>

  );
}

export default App;
