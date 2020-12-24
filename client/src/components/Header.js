import '../styles/Header.scss'
function Header() {
    return (
  
        <nav class="navbar is-transparent is-spaced is-dark">
<div class="navbar-brand">
<a class="navbar-item" href="https://bulma.io">
    <div class="navbar-heading">Bitter</div>
{/* <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28" /> */}
</a>
<div class="navbar-burger" data-target="navbarExampleTransparentExample">
<span></span>
<span></span>
<span></span>
</div>
</div>

<div id="navbarExampleTransparentExample" class="navbar-menu">
<div class="navbar-start">
<a class="navbar-item" href="https://bulma.io/">
  Projects
</a>
<a class="navbar-item" href="https://bulma.io/">
  Confessions
</a> 
{/* <a class="navbar-item" href="https://bulma.io/">
  Home
</a> */}
</div>


</div>
</nav>
  
    );
  }
  
  export default Header;


