/**
 * Servicio API Rick and Morty
 */

const API_JSON = "http://localhost:3002";

import httpClient from './httpClient.js';

/**
 * Obtiene personajes.
 *
 * @returns {Promise<Array>}
 */
export async function getCharacters() {
    try {
        const response = await httpClient.get('/character');
        return response.data.results || [];

    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getLocation() {
    try {
        const response = await httpClient.get('/location');
        return response.data.results;
         } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getEpisodio() {
    try {
        const response = await httpClient.get('/episode');
        return response.data.results;

    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function postNewCharacter(character) {
    const res = await fetch(`${API_JSON}/character`, {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(character)
    })
}

export async function getLocalCharacters() {
     const res = await fetch(`${API_JSON}/character`)
     return res.json()
}

export async function updateLocalCharacter(id, character) {
    const res = await fetch(`${API_JSON}/character/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(character)
    });
    return res.json();
}

const EDITED_API_KEY = 'editedApiCharacters';

export function getEditedApiCharacters() {
    return JSON.parse(localStorage.getItem(EDITED_API_KEY)) || {};
}

export function saveEditedApiCharacter(id, data) {
    const edited = getEditedApiCharacters();
    edited[String(id)] = data;
    localStorage.setItem(EDITED_API_KEY, JSON.stringify(edited));
}

export async function deleteCharacter(id) {
    try {
        const res = await fetch(`${API_JSON}/character/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return res.json();
    } catch (error) {
        console.error('Error deleting character:', error);
        throw error;
    }
}
