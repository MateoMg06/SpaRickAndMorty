/**
 * Character Card Component
 */

export function characterCard(character) {
  const status = character.status || "unknown";
  const statusClass =
    status.toLowerCase() === "alive"
      ? "alive"
      : status.toLowerCase() === "dead"
        ? "dead"
        : "unknown-s";

  return `
    <article class="card">
      <div class="img-wrap">
        <img src="${character.image}" alt="${character.name}" loading="lazy">

        <div class="phosphor-over"></div>

        <div class="badge-species">${(character.species || "UNKNOWN").toUpperCase()}</div>
        <div class="badge-gender">${character.gender || "???"}</div>
      </div>

      <div class="card-body">
        <div class="card-name" title="${character.name}">
          ${character.name.toUpperCase()}
        </div>

        <div class="card-meta">
          <span class="status-dot ${statusClass}"></span>
          <span>${status.toUpperCase()}</span>
        </div>

        <div class="card-loc">
          <span>${character.location?.name || "UNKNOWN"}</span>
        </div>
        <button class="delete-btn" data-id="${character.id}">Eliminar</button>
      </div>
    </article>
  `;
}
