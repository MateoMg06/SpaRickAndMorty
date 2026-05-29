import { imgepisodio } from "./imgEpisodios.js";

/**
 * Character Card Component
 */

export function episodioCard(episodio) {

    return `
        <article class="card">
        <div class="img-wrap">
                <img src="${imgepisodio[episodio.name]}" alt="${episodio.name}" loading="lazy">
        
                <div class="phosphor-over"></div>
        
              </div>
            <div class="card-body">
                <h3>${episodio.name}</h3>
                <p>
                    <strong>Dia de lanzamiento:</strong>
                    ${episodio.air_date}
                </p>
                <p>
                    <strong>Episodio:</strong>
                    ${episodio.episode}
                </p>
            </div>
        </article>
    `;
}
