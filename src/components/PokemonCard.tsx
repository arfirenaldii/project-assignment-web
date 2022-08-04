import React, { useState, useEffect } from "react";
import {
    Typography,
    Card,
    CardContent,
} from "@material-ui/core";
import baseApi from "@utils/api";

import { usePokemon } from "src/reducers/pokemon/context";
import { setPokemon, toggleDialog } from "src/reducers/pokemon/actions";

const baseURL = 'https://pokeapi.co/api/v2/';

function PokemonCard(props) {
    const { state, dispatch } = usePokemon();
    const [pokemon, setPokemonState] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPokemon();
    }, []);

    const getPokemon = async () => {
        const res = await baseApi(baseURL);
        const json = await res.get(`pokemon/${props.id}`);
        setPokemonState(json.data);
        setLoading(false);
    };

    const handleSetPokemon = () => {
        dispatch(setPokemon(pokemon));
        dispatch(toggleDialog());
    };

    if (loading) return <div>loading...</div>;

    return (
        <Card variant="elevation" elevation={8} onClick={handleSetPokemon}>
            <CardContent>
                <img
                    src={pokemon.sprites.other.dream_world.front_default}
                    alt={pokemon.name}
                    height={100}
                />
                <Typography>#{pokemon.order}</Typography>
                <Typography>{pokemon.name}</Typography>
                {pokemon.types.map(type =>
                    <Typography key={`${type}-${type.slot}`}>{type.type.name}</Typography>
                )}
            </CardContent>
        </Card>
    );
}

export default PokemonCard;
