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
    const deleteButtons = document.querySelectorAll(".delete-btn");

deleteButtons.forEach(button => {
    button.addEventListener("click", () => {
        const id = button.dataset.id;
        const confirmDelete = confirm(
            "¿Seguro que quieres eliminar este personaje?"
        );
        if (!confirmDelete) return;
        //guardar en localStorage
        const deleteCharacters =
            JSON.parse(localStorage.getItem("deleteCharacters")) || [];

        if (!deleteCharacters.includes(id)) {
            deleteCharacters.push(id);
        }
        localStorage.setItem(
            "deleteCharacters",
            JSON.stringify(deleteCharacters)
        );
        // ocultar en pantalla
        const card = document.getElementById(`character-${id}`);
        if (card) card.style.display = "none";

        alert("Personaje eliminado");
    });
});
}
