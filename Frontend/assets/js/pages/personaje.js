import { loadHTML } from '../utils/helpers.js';
import { getCharacters, postNewCharacter , getLocalCharacters} from '../services/api.js';
import { characterCard } from '../components/characterCard.js';

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



