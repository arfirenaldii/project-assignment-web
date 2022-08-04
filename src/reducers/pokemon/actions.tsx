import {
    SET_POKEMON,
    TOGGLE_DIALOG,
} from './constants';

export function setPokemon(pokemon) {
    return {
        type: SET_POKEMON,
        pokemon
    };
}

export function toggleDialog() {
    return {
        type: TOGGLE_DIALOG
    };
}