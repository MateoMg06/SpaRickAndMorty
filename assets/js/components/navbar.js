/**
 * Navbar Component
 */

export async function loadNavbar() {

    const navbar = document.getElementById('navbar');

    navbar.innerHTML = `
        <nav class="navbar">
            <a class="nav-item active" href="/" data-section="inicio">
            <span class="nav-icon portal-mini"></span>
            <span>Inicio</span>
            </a>
            <a class="nav-item" href="/personajes" data-section="personajes">
            <span class="nav-icon icon-face"></span>
            <span>Personajes</span>
           </a>
           <a class="nav-item" href="/episodios" data-section="episodios">
            <span class="nav-icon icon-tv"></span>
            <span>Episodios</span>
          </a>
          <a class="nav-item" href="/planetas" data-section="planetas">
            <span class="nav-icon icon-planet"></span>
            <span>Planetas</span>
          </a>


        </nav>
    `;
}