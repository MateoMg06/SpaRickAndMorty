import { imgplanet } from "./imgPlanets.js";
/**
 * Character Card Component
 */

export function UbicacionCard(location) {
   
    return `
        <article class="card">
           <div class="img-wrap">
        <img  src="${imgplanet[location.name]}" alt="${location.name}" loading="lazy">

        <div class="phosphor-over"></div>

      </div>

            <div class="card-body">
                <h3 class="card-name">${location.name}</h3>
                <div class="location-details">
                    <p class="location-info">
                        <span class="location-label">Tipo</span>
                        <span>${location.type}</span>
                    </p>
                    <p class="location-info">
                        <span class="location-label">Dimension</span>
                        <span>${location.dimension}</span>
                    </p>
                </div>
            </div>
        </article>
    `;
}   
