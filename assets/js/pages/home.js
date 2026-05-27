import { loadHTML } from '../utils/helpers.js';
import { getCharacters } from '../services/api.js';
import { characterCard } from '../components/characterCard.js';

/**
 * Renderiza Home
 */
export async function renderHome() {
    const content = document.getElementById('content');
    content.innerHTML = await loadHTML(
        './assets/js/views/home.html'
    );
    const container = document.getElementById(
        'characters-container'
    );
    const characters = await getCharacters();
    container.innerHTML = characters
        .map(character => characterCard(character))
        .join('');

    /**
    * Eliminar
    */

    const deleteButton = document.querySelectorAll(".delete-btn");

    deleteButton.forEach(button => {

        button.addEventListener("click", () => {

            const confirmDelete = confirm(
                "¿Seguro que quieres eliminar este personaje?"
            );

            if (!confirmDelete) return;

            const id = button.dataset.id;

            const card = document.getElementById(
                `character-${id}`
            );

            card.style.display = "none";

            alert("Personaje eliminado");

        });

    });

}
