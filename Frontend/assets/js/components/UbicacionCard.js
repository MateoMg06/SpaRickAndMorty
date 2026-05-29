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
                <p>
                    <strong>Tipo:</strong>
                    ${location.type}
                </p>
                <p>
                    <strong>Dimension:</strong>
                    ${location.dimension}
                </p>
            </div>
        </article>
    `;
}   