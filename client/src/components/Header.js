import { Link } from 'react-router-dom'

import '../styles/Header.scss'
function Header() {
    return (
  
    <nav class="navbar is-transparent is-spaced is-dark is-mobile">
      <div class="navbar-brand">
        <a class="navbar-item" href="#">
            <div class="navbar-heading">Bitter</div>
        {/* <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28" /> */}
        </a>
      </div>


        <div class="navbar-start">
          {/* <a class="navbar-item" href="#">
          </a> */}

          <Link to="/" class="navbar-item">
            <p class="nav-item__link">Projects</p>
          </Link>
        </div>

        <div class="navbar-end">
          <Link to="/auth" class="navbar-item">
            <p class="nav-item__link">Login</p>
          </Link>
          <Link to="/auth" class="navbar-item">
            <p class="nav-item__link">Register</p>
          </Link>
          <Link to="/auth" class="navbar-item">
            <p class="nav-item__link">Logout</p>
          </Link>
       
          
        </div>



    </nav>
  
    );
  }
  
  export default Header;


