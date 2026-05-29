import { loadHTML } from "../utils/helpers.js";

export async function renderInicio() {
    const content = document.getElementById('content');
    console.log(content)
    content.innerHTML = await loadHTML(
        './assets/js/views/inicio.html'
    );

}