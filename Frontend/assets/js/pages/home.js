import { loadHTML } from '../utils/helpers.js';
import { getCharacters, postNewCharacter } from '../services/api.js';
import { characterCard } from '../components/characterCard.js';

/**
 * Renderiza Home
 */
export async function renderPersonajes() {
    const content = document.getElementById('content');
    content.innerHTML = await loadHTML(
        './assets/views/personajes.html'
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
    const btnCancelar = document.getElementById('cancelar');
    const popup = document.getElementById('miPopup');
    const form = document.getElementById('character-form');

    if (!btnAbrir || !btnCerrar || !popup) return;

    btnAbrir.addEventListener('click', () => {
        popup.showModal(); // Despliega la ventana
    });

    btnCerrar.addEventListener('click', () => {
        popup.close(); // Cierra la ventana
    });

    btnCancelar?.addEventListener('click', () => {
        popup.close();
    });

    form?.addEventListener('submit', async event => {
        event.preventDefault();
        
        const Newcharacter = {
             name:document.getElementById("name").value,
             especie:document.getElementById("especie").value,
             genero:document.getElementById("genero").value,
             estado:document.getElementById("estado").value
        }
        await postNewCharacter(Newcharacter)
        popup.close();
    });

}


