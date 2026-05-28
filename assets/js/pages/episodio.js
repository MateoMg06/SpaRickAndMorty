import { loadHTML } from '../utils/helpers.js';
import { getEpisodio } from '../services/api.js';
import { episodioCard } from '../components/episodiosCard.js';

/**
 * Renderiza About
 */
export async function renderEpisodio() {

    const content = document.getElementById('content');
    content.innerHTML = await loadHTML(
        './assets/js/views/episodio.html'
    );
    const container = document.getElementById(
        'episodios-container'
    );
    const characters = await getEpisodio();
    container.innerHTML = characters
        .map(character => episodioCard(character))
        .join('');
}
