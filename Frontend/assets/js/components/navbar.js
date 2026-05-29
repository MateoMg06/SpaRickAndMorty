/**
 * Navbar Component
 */

export async function loadNavbar() {

    const navbar = document.getElementById('navbar');

    navbar.innerHTML = `
        <div class="mobile-nav-header">
            <a class="brand" href="/" data-link aria-label="Multiverse Flux">
            </a>
            <button class="menu-toggle" type="button" aria-label="Abrir menu" aria-expanded="false" aria-controls="main-menu">
                <span class="menu-symbol" aria-hidden="true">☰</span>
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
         <a class="brand desktop-brand" href="/" data-link aria-label="Multiverse Flux">
        </a>
        <nav class="side-nav" id="main-menu" aria-label="Navegacion principal">
            <a class="nav-item" href="/" data-link data-section="inicio">
            <span class="nav-icon portal-mini"></span>
            <span>Inicio</span>
            </a>
            <a class="nav-item" href="/personajes" data-link data-section="personajes">
            <span class="nav-icon icon-face"></span>
            <span>Personajes</span>
           </a>
           <a class="nav-item" href="/episodios" data-link data-section="episodios">
            <span class="nav-icon icon-tv"></span>
            <span>Episodios</span>
          </a>
          <a class="nav-item" href="/planetas" data-link data-section="planetas">
            <span class="nav-icon icon-planet"></span>
            <span>Planetas</span>
          </a>


        </nav>
    `;

    updateActiveNavbar();

    const toggle = navbar.querySelector('.menu-toggle');
    const menu = navbar.querySelector('.side-nav');

    toggle?.addEventListener('click', () => {
        const isOpen = navbar.classList.toggle('menu-open');
        toggle.querySelector('.menu-symbol').textContent = isOpen ? '×' : '☰';
        toggle.setAttribute('aria-expanded', String(isOpen));
        toggle.setAttribute('aria-label', isOpen ? 'Cerrar menu' : 'Abrir menu');
    });

    navbar.addEventListener('click', event => {
        if (!event.target.closest('[data-link]')) return;
        navbar.classList.remove('menu-open');
        toggle?.querySelector('.menu-symbol') && (toggle.querySelector('.menu-symbol').textContent = '☰');
        toggle?.setAttribute('aria-expanded', 'false');
        toggle?.setAttribute('aria-label', 'Abrir menu');
    });
}

export function updateActiveNavbar(path = window.location.pathname) {
    const sectionByPath = {
        '/': 'inicio',
        '/personajes': 'personajes',
        '/episodios': 'episodios',
        '/planetas': 'planetas',
    };

    const activeSection = sectionByPath[path] || 'inicio';

    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.toggle(
            'active',
            item.dataset.section === activeSection
        );
    });
}
