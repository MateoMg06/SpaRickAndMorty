import { loadHTML } from '../utils/helpers.js';
import { getCharacters } from '../services/api.js';
import { characterCard } from '../components/characterCard.js';

/**
 * Renderiza Home
 */
export async function renderPersonajes() {
    const content = document.getElementById('content');
    content.innerHTML = await loadHTML(
        './assets/js/views/personajes.html'
    );
    const container = document.getElementById(
        'characters-container'
    );
    const characters = await getCharacters();
    container.innerHTML = characters
        .map(character => characterCard(character))
        .join('');

    const btnAbrir = document.getElementById('abrir');
    const btnCerrar = document.getElementById('cerrar');
    const popup = document.getElementById('miPopup');

    if (!btnAbrir || !btnCerrar || !popup) return;

    btnAbrir.addEventListener('click', () => {
        popup.showModal(); // Despliega la ventana
    });

    btnCerrar.addEventListener('click', () => {
        popup.close(); // Cierra la ventana
    });

}


