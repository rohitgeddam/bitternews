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
          <a class="navbar-item" href="#">
            <p class="nav-item__link">Projects</p>
          </a>
          {/* <a class="navbar-item" href="https://bulma.io/">
            Confessions
          </a>  */}
        </div>




    </nav>
  
    );
  }
  
  export default Header;


