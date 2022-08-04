import React from "react";
import { useRouter } from "next/router";
import {
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { usePokemon } from "src/reducers/pokemon/context";
import { toggleDialog } from "src/reducers/pokemon/actions";

const Title = (props) => {
    return (
        <DialogTitle>
            <IconButton aria-label="close" onClick={props.onClose}>
                <Close />
            </IconButton>
        </DialogTitle>
    );
};

function PokemonDialog(props) {
    const route = useRouter();
    const { state, dispatch } = usePokemon();
    const { pokemon } = state;

    const handleToggleDialog = () => {
        dispatch(toggleDialog());
    };

    const handleToDetail = () => {
        route.push(`/pokemon/detail/${pokemon.id}`);
    };

    if (!pokemon) return null;

    return (
        <Dialog onClose={handleToggleDialog} aria-labelledby="customized-dialog-title" open={state.showDialog}>
            <Title onClose={handleToggleDialog} />
            <DialogContent>
                <img
                    src={pokemon.sprites.other.dream_world.front_default}
                    alt={pokemon.name}
                    height={100}
                />
                <Typography>{pokemon.name}</Typography>
                <Typography>Weight: {pokemon.weight}</Typography>
                <Typography>Height: {pokemon.height}</Typography>
                <Typography>Abilities:</Typography>
                {pokemon.abilities.map(ability =>
                    <Typography key={`${ability}-${ability.slot}`}>{`${ability.ability.name}`} {ability.is_hidden && ' (hidden)'}</Typography>
                )}
                <Typography>Type:</Typography>
                {pokemon.types.map(type =>
                    <Typography key={`${type}-${type.slot}`}>{type.type.name}</Typography>
                )}
                <button onClick={handleToDetail}>More Detail</button>
            </DialogContent>
        </Dialog>
    );
}

export default PokemonDialog;
