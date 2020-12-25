import { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import UserContext from './UserContext'

import Error from "./pages/Error"
import Header from "./components/Header";

import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProjectsPage from './pages/ProjectsPage'
function App() {

  const [user, setUser] = useState()

  return (

      <div class="container is-max-desktop">
         <UserContext.Provider value={{user, setUser}}>
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
          </UserContext.Provider>

      </div>

  );
}

export default App;
