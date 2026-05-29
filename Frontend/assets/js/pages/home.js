import { loadHTML } from '../utils/helpers.js';
import { getCharacters, postNewCharacter } from '../services/api.js';
import { characterCard } from '../components/characterCard.js';

/**
 * Renderiza Home
 */
export async function renderPersonajes() {
  const content = document.getElementById("content");
  content.innerHTML = await loadHTML("./assets/views/personajes.html");
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

  const container = document.getElementById("characters-container");
  const characters = await getCharacters();

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
    button.addEventListener("click", () => {
      const id = button.dataset.id;
      const confirmDelete = confirm(
        "Seguro que quieres eliminar este personaje?",
      );
      if (!confirmDelete) return;

      const deletedCharacters = getDeletedCharacters();

      if (!deletedCharacters.includes(id)) {
        deletedCharacters.push(id);
        saveDeletedCharacters(deletedCharacters);
      }

      const card = button.closest(".card");
      if (card) card.remove();

      alert("Personaje eliminado");
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
      name: document.getElementById("name").value,
      especie: document.getElementById("especie").value,
      genero: document.getElementById("genero").value,
      estado: document.getElementById("estado").value,
    };

    await postNewCharacter(Newcharacter);
   popup.close();
  });
}
