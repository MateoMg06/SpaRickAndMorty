/**
 * ---------------------------------------------------------
 * Archivo principal SPA
 * ---------------------------------------------------------
 */

import { loadNavbar } from './components/navbar.js';
import { router } from './router.js';

/**
 * Navega entre rutas sin recargar.
 *
 * @param {string} url
 */
export function navigateTo(url) {
    if (window.location.pathname === url) return;

    history.pushState(null, null, url);
    router();
}

/**
 * Inicialización principal.
 */
window.addEventListener('DOMContentLoaded', async () => {
    await loadNavbar();
    router();

    /**
     * Intercepta links SPA
     */
    document.body.addEventListener('click', event => {
        const target = event.target.closest('[data-link]');
        if (target) {
            event.preventDefault();
            navigateTo(target.pathname);
        }
    });
});

/**
 * Maneja las acciones de ir atrás/adelante en el navegador navegador
 */
window.addEventListener('popstate', router);
