import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client' 
import UserContext from './UserContext'

import Error from "./pages/Error"
import Header from "./components/Header";

import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProjectsPage from './pages/ProjectsPage'
import { AUTH_TOKEN } from './constants'

const GET_USER_QUERY = gql`
  query getUser {
    me {
      status
      message
      data {
        id
        username
        email
      }
    }
}

`

function App() {

  const [user, setUser] = useState()
  const { loading, error, data } = useQuery(GET_USER_QUERY, {
    onCompleted: ({me}) => {

      if (me.status === 'Success') {
        const user = me.data
        setUser({
          email: user.email,
          username: user.username,
          id: user.id,
        })
      }
    }
  });

  if (loading)  {

    return <div class="loading">
      Loading...
    </div>
  }

  if (error) {
    // delete the invalid token
    localStorage.removeItem(AUTH_TOKEN)
  }


  return (

      <div class="container is-max-desktop">
         <UserContext.Provider value={{user, setUser}}>
        <Header/>
          <Switch>
           
              <Route exact path="/" component={ProjectsPage}/>
              <Route path="/auth/signin" component={LoginPage}/>
              <Route path="/auth/signup" component={RegisterPage}/>
              <Route component={Error} />
          </Switch>
          </UserContext.Provider>

      </div>

  );
}

export default App;
