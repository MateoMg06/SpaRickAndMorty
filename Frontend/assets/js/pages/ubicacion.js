import { loadHTML } from '../utils/helpers.js';
import { getLocation } from '../services/api.js';
import { characterCard } from '../components/characterCard.js';
import { UbicacionCard } from '../components/UbicacionCard.js';

/**
 * Renderiza Home
 */
export async function renderUbicacion() {
    const content = document.getElementById('content');
    content.innerHTML = await loadHTML(
        './assets/views/ubicaciones.html'
    );
    const container = document.getElementById(
        'location-container'
    );
    const characters = await getLocation();
    container.innerHTML = characters
        .map(character => UbicacionCard(character))
        .join('');
}
