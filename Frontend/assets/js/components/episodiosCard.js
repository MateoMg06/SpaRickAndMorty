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
                <h3 class="card-name">${episodio.name}</h3>
                <div class="episode-details">
                    <p class="episode-info">
                        <span class="episode-label">Lanzamiento</span>
                        <span>${episodio.air_date}</span>
                    </p>
                    <p class="episode-info">
                        <span class="episode-label">Episodio</span>
                        <span>${episodio.episode}</span>
                    </p>
                </div>
            </div>
        </article>
    `;
}
