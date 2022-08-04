import React, { FC } from "react";
import { useRouter } from 'next/router';
import useTranslation from "next-translate/useTranslation";
import { Box, Container, Typography } from "@material-ui/core";

const DetailPokemon: FC = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const { id } = router.query;

    return (
        <Container maxWidth="xl">
            <Box component="div" m={10}>
                <Typography>Detail Pokemon {id}</Typography>
            </Box>
        </Container>
    );
};

export default DetailPokemon;
