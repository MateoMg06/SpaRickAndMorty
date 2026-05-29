import { loadHTML } from '../utils/helpers.js';
import { getCharacters, postNewCharacter , getLocalCharacters, deleteCharacter} from '../services/api.js';
import { characterCard } from '../components/characterCard.js';
import { alertaExitosa, alertaConfirmacion, alertaError } from '../utils/alerts.js';

/**
 * Renderiza Home
 */
export async function renderPersonajes() {

    const content = document.getElementById('content');
    content.innerHTML = await loadHTML(
        './assets/views/personajes.html'
    );
    await loadCharacter();
    const container = document.getElementById(
        'characters-container'
    );
    const characters = await getCharacters();
    container.innerHTML = characters
        .map(character => characterCard(character))
        .join('')
  const DELETED_CHARACTERS_KEY = "deleteCharacters";

  function getDeletedCharacters() {
    return JSON.parse(localStorage.getItem(DELETED_CHARACTERS_KEY)) || [];
  }

  function saveDeletedCharacters(deletedCharacters) {
    localStorage.setItem(
      DELETED_CHARACTERS_KEY,
      JSON.stringify(deletedCharacters)
    );
  }

  const btnAbrir = document.getElementById("abrir");
  const btnCerrar = document.getElementById("cerrar");
  const btnCancelar = document.getElementById("cancelar");
  const popup = document.getElementById("miPopup");
  const form = document.getElementById("character-form");
  const deletedCharacters = getDeletedCharacters();

  const visibleCharacters = characters.filter(
    (character) => !deletedCharacters.includes(String(character.id)),
  );

  container.innerHTML = visibleCharacters
    .map((character) => characterCard(character))
    .join("");

  /**
   * Eliminar
   */

  const deleteButtons = document.querySelectorAll(".delete-btn");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const id = button.dataset.id;
      const confirmDelete = await alertaConfirmacion();
      if (!confirmDelete) return;

      try {
        const localCharacters = await getLocalCharacters();
        const isLocalCharacter = localCharacters.some(char => char.id === id);

        if (isLocalCharacter) {
          // Eliminar del JSON server
          await deleteCharacter(id);
          const card = button.closest(".card");
          if (card) card.remove();
          await loadCharacter(); // Recargar la lista de locales
          alertaExitosa("Personaje eliminado");
        } else {
          // Eliminar de la API (guardar en localStorage)
          const deletedCharacters = getDeletedCharacters();
          if (!deletedCharacters.includes(id)) {
            deletedCharacters.push(id);
            saveDeletedCharacters(deletedCharacters);
          }
          const card = button.closest(".card");
          if (card) card.remove();
          alertaExitosa("Personaje eliminado");
        }
      } catch (error) {
        console.error('Error al eliminar:', error);
        alertaError("Error al eliminar el personaje");
      }
    });
  });

  if (!btnAbrir || !btnCerrar || !popup) return;

  btnAbrir.addEventListener("click", () => {
    popup.showModal(); // Despliega la ventana
  });

  btnCerrar.addEventListener("click", () => {
    popup.close(); // Cierra la ventana
  });

  btnCancelar?.addEventListener("click", () => {
    popup.close();
  });

  form?.addEventListener("submit", async (event) => {
    event.preventDefault();

        const Newcharacter = {
             name:document.getElementById("name").value,
             species:document.getElementById("especie").value,
             gender:document.getElementById("genero").value,
             status:document.getElementById("estado").value,
             image:"https://rickandmortyapi.com/api/character/avatar/19.jpeg"
        }
        await postNewCharacter(Newcharacter)
        await loadCharacter()
        popup.close();

  });
}

async function loadCharacter() {
    const characters = await getLocalCharacters()
    const container = document.getElementById("local-characters")
    console.log(container)
    container.innerHTML= characters.map(character => characterCard(character))
        .join('');
    
}



