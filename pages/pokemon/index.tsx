import React, { FC, useState, useEffect } from "react";
import useTranslation from "next-translate/useTranslation";
import {
    Box,
    Container,
    Typography,
} from "@material-ui/core";
import baseApi from "@utils/api";
import PokemonCard from "@components/PokemonCard";
import PokemonDialog from "@components/PokemonDialog";

import { PokemonProvider } from "src/reducers/pokemon/context";

const baseURL = 'https://pokeapi.co/api/v2/';

const PokemonList: FC = () => {
    const [pokemon, setPokemon] = useState([]);
    const [pokemonList, setPokemonList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(9);
    const { t } = useTranslation();

    useEffect(() => {
        getPokemons();
    }, [offset]);

    const getPokemons = async () => {
        const res = await baseApi(baseURL);
        const json = await res.get(`pokemon/?offset=${offset}&limit=${limit}`);
        setPokemon(json.data);

        const createPokemonList = (result) => {
            let pokemonList = [];
            result.forEach((pokemon, index) => {
                pokemonList.push(<PokemonCard key={`${index}-${pokemon.name}`} id={pokemon.name} />);
            });
            setPokemonList(pokemonList);
            setLoading(false);
        };
        createPokemonList(json.data.results);
    };

    const handlePagination = (navigation) => {
        setLoading(true);
        if (navigation === 'next') {
            setOffset(offset + 9);
        } else {
            setOffset(offset - 9);
        }
    };

    return (
        <PokemonProvider>
            <Container maxWidth="lg">
                <Box component="div" m={10}>
                    <Typography>PokeDex</Typography>
                    <Typography>{`${pokemon.count} Pokemon`}</Typography>
                    <button onClick={() => handlePagination('prev')} disabled={loading || !pokemon.previous}>Prev</button>
                    <button onClick={() => handlePagination('next')} disabled={loading || !pokemon.next}>Next</button>
                    {pokemonList}
                    <PokemonDialog />
                </Box>
            </Container>
        </PokemonProvider>
    );
};

export default PokemonList;
