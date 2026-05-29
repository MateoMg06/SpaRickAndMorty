/**
 * Router SPA
 */

import { renderPersonajes } from './pages/home.js';
import { renderInicio } from './pages/inicio.js';
import { renderEpisodio } from './pages/episodio.js';
import { renderUbicacion } from './pages/ubicacion.js';
import { updateActiveNavbar } from './components/navbar.js';
/**
 * Rutas disponibles
 */
const routes = {
    '/':renderInicio,
    '/personajes': renderPersonajes,
    '/episodios': renderEpisodio,
    '/planetas': renderUbicacion,
};

/**
 * Router principal
 */
export async function router() {

    // Obtiene ruta real
    const path = window.location.pathname;
    updateActiveNavbar(path);
    // Busca render
    const render = routes[path];
    if (render) {
        await render();
    } else {
        document.getElementById('content').innerHTML = `
            <section>
                <h2>404 - Página no encontrada</h2>
            </section>
        `;
    }
}
