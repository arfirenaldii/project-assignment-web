import React, { useReducer, useContext } from "react";

import {
    SET_POKEMON,
    TOGGLE_DIALOG,
} from './constants';

const initialState = {
    pokemon: '',
    showDialog: false,
};

const PokemonContext = React.createContext();

function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_POKEMON:
            return { ...state, pokemon: action.pokemon };
        case TOGGLE_DIALOG:
            return { ...state, showDialog: !state.showDialog };
        default:
            return state;
    }
}

function PokemonProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch };
    return <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>;
}

function usePokemon() {
    const context = useContext(PokemonContext);
    if (context === undefined) {
        throw new Error('usePokemon must be used within a PokemonProvider');
    }
    return context;
}

export { PokemonProvider, usePokemon };