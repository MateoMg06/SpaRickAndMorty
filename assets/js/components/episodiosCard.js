/**
 * Character Card Component
 */

export function episodioCard(character) {

    return `
        <article class="card">
        <div class="card-img">
            <img
                src="https://www.freepnglogos.com/uploads/rick-and-morty-png/rick-and-morty-portal-shoes-white-clothing-zavvi-23.png"
                alt="${character.name}"
            >
            </div>
            <div class="card-body">
                <h3>${character.name}</h3>
                <p>
                    <strong>Dia de lanzamiento:</strong>
                    ${character.air_date}
                </p>
                <p>
                    <strong>Episodio:</strong>
                    ${character.episode}
                </p>
            </div>
        </article>
    `;
}
