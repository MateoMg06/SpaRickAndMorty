import { loadHTML } from '../utils/helpers.js';
import {
    getCharacters,
    postNewCharacter,
    getLocalCharacters,
    deleteCharacter,
    updateLocalCharacter,
    getEditedApiCharacters,
    saveEditedApiCharacter
} from '../services/api.js';
import { characterCard } from '../components/characterCard.js';
import { alertaExitosa, alertaConfirmacion, alertaError } from '../utils/alerts.js';

const DELETED_KEY = "deleteCharacters";

function getDeletedIds() {
    return JSON.parse(localStorage.getItem(DELETED_KEY)) || [];
}

function saveDeletedIds(ids) {
    localStorage.setItem(DELETED_KEY, JSON.stringify(ids));
}

function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export async function renderPersonajes() {
    const content = document.getElementById('content');
    content.innerHTML = await loadHTML('./assets/views/personajes.html');

    let allApiCharacters = [];
    let visibleApiCharacters = [];
    let localCharactersCache = [];

    const apiContainer = document.getElementById('characters-container');
    const popup = document.getElementById("miPopup");
    const form = document.getElementById("character-form");
    const modalTitle = document.getElementById("character-modal-title");
    const saveBtn = document.getElementById("guardar-personaje");

    // Estado de edición
    let editMode = false;
    let editCharacterId = null;
    let editCharacterSource = null;

    function buildVisibleApiCharacters() {
        const edited = getEditedApiCharacters();
        const deletedIds = getDeletedIds();
        return allApiCharacters
            .filter(c => !deletedIds.includes(String(c.id)))
            .map(c => {
                const override = edited[String(c.id)];
                return override ? { ...c, ...override } : c;
            });
    }

    async function loadLocalCharacters() {
        localCharactersCache = await getLocalCharacters();
        const container = document.getElementById("local-characters");
        container.innerHTML = localCharactersCache
            .map(c => characterCard(c, 'local'))
            .join('');
        attachButtonListeners(container);
    }

    function renderApiCharacters() {
        visibleApiCharacters = buildVisibleApiCharacters();
        apiContainer.innerHTML = visibleApiCharacters
            .map(c => characterCard(c, 'api'))
            .join('');
        attachButtonListeners(apiContainer);
    }

    function attachButtonListeners(container) {
        container.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', handleEditClick);
        });
        container.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', handleDeleteClick);
        });
    }

    async function handleEditClick(event) {
        const btn = event.currentTarget;
        const id = btn.dataset.id;
        const source = btn.dataset.source;
        let character = null;

        if (source === 'api') {
            character = visibleApiCharacters.find(c => String(c.id) === String(id));
        } else {
            character = localCharactersCache.find(c => String(c.id) === String(id));
        }

        if (!character) return;

        editMode = true;
        editCharacterId = id;
        editCharacterSource = source;

        modalTitle.textContent = 'EDITAR PERSONAJE';
        saveBtn.textContent = 'UPDATE CHAR';

        document.getElementById('name').value = character.name || '';
        document.getElementById('especie').value = character.species || '';
        document.getElementById('estado').value = capitalize(character.status) || 'Alive';
        document.getElementById('genero').value = capitalize(character.gender) || 'Female';

        popup.showModal();
    }

    async function handleDeleteClick(event) {
        const btn = event.currentTarget;
        const id = btn.dataset.id;
        const confirmed = await alertaConfirmacion();
        if (!confirmed) return;

        try {
            const isLocal = localCharactersCache.some(c => String(c.id) === String(id));

            if (isLocal) {
                await deleteCharacter(id);
                await loadLocalCharacters();
                alertaExitosa("Personaje eliminado");
            } else {
                const deletedIds = getDeletedIds();
                if (!deletedIds.includes(String(id))) {
                    deletedIds.push(String(id));
                    saveDeletedIds(deletedIds);
                }
                renderApiCharacters();
                alertaExitosa("Personaje eliminado");
            }
        } catch (error) {
            console.error('Error al eliminar:', error);
            alertaError("Error al eliminar el personaje");
        }
    }

    // Carga inicial
    allApiCharacters = await getCharacters();
    renderApiCharacters();
    await loadLocalCharacters();

    // Botón abrir modal (crear)
    document.getElementById("abrir").addEventListener("click", () => {
        editMode = false;
        editCharacterId = null;
        editCharacterSource = null;
        modalTitle.textContent = 'NUEVO PERSONAJE';
        saveBtn.textContent = 'SAVE CHAR';
        form.reset();
        popup.showModal();
    });

    document.getElementById("cerrar").addEventListener("click", () => popup.close());
    document.getElementById("cancelar")?.addEventListener("click", () => popup.close());

    form?.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = {
            name: document.getElementById("name").value,
            species: document.getElementById("especie").value,
            gender: document.getElementById("genero").value,
            status: document.getElementById("estado").value,
        };

        try {
            if (editMode) {
                if (editCharacterSource === 'local') {
                    // Actualizar en el archivo JSON via json-server
                    const existing = localCharactersCache.find(c => String(c.id) === String(editCharacterId));
                    await updateLocalCharacter(editCharacterId, { ...existing, ...formData });
                    await loadLocalCharacters();
                } else {
                    // Guardar edición de personaje API en localStorage
                    saveEditedApiCharacter(editCharacterId, formData);
                    renderApiCharacters();
                }
                alertaExitosa("Personaje actualizado");
            } else {
                await postNewCharacter({
                    ...formData,
                    image: "https://rickandmortyapi.com/api/character/avatar/19.jpeg"
                });
                await loadLocalCharacters();
                alertaExitosa("Personaje creado");
            }
        } catch (error) {
            console.error('Error al guardar:', error);
            alertaError("Error al guardar el personaje");
        }

        popup.close();
    });
}
