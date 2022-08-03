import React, { useState, useEffect } from "react";
import {
    Typography,
    Card,
    CardContent,
} from "@material-ui/core";
import baseApi from "@utils/api";

const baseURL = 'https://pokeapi.co/api/v2/';

function PokemonCard(props) {
    const [pokemon, setPokemon] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPokemon();
    }, []);

    const getPokemon = async () => {
        const res = await baseApi(baseURL);
        const json = await res.get(`pokemon/${props.id}`);
        setPokemon(json.data);
        setLoading(false);
    };

    if (loading) return <div>loading...</div>;

    return (
        <Card variant="elevation" elevation={8}>
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
