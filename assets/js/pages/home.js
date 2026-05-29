import { loadHTML } from '../utils/helpers.js';
import { getCharacters } from '../services/api.js';
import { characterCard } from '../components/characterCard.js';

const DELETED_CHARACTERS_KEY = 'deleteCharacters';

function getDeletedCharacters() {
    return JSON.parse(
        localStorage.getItem(DELETED_CHARACTERS_KEY)
    ) || [];
}

function saveDeletedCharacters(deletedCharacters) {
    localStorage.setItem(
        DELETED_CHARACTERS_KEY,
        JSON.stringify(deletedCharacters)
    );
}

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
    const deletedCharacters = getDeletedCharacters();
    const visibleCharacters = characters.filter(
        character => !deletedCharacters.includes(String(character.id))
    );

    container.innerHTML = visibleCharacters
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
                "Seguro que quieres eliminar este personaje?"
            );
            if (!confirmDelete) return;

            const deletedCharacters = getDeletedCharacters();

            if (!deletedCharacters.includes(id)) {
                deletedCharacters.push(id);
                saveDeletedCharacters(deletedCharacters);
            }

            const card = document.getElementById(`character-${id}`);
            if (card) card.remove();

            alert("Personaje eliminado");
        });
    });
}
