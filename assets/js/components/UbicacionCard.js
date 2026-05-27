import { imgplanet } from "./imgPlanets.js";
/**
 * Character Card Component
 */

export function UbicacionCard(location) {
   
    return `
        <article class="card">
            <img
                src="${imgplanet[location.name]}"
                alt=""
            >

            <div class="card-body">
                <h3>${location.name}</h3>
                <p>
                    <strong>Status:</strong>
                    ${location.type}
                </p>
                <p>
                    <strong>Species:</strong>
                    ${location.dimension}
                </p>
            </div>
        </article>
    `;
}   