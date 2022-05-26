
import { useState, useEffect } from 'react';

import { NextPage } from 'next';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Button, Card, Container, Grid, Text, Image } from '@nextui-org/react';


import { Pokemon } from '../../interfaces/pokemon-full';
import { pokeApi } from '../../api';
import { Layout } from '../../componets/layouts';
import { PokemonListResponse } from '../../interfaces/pokemon-list';

import confetti from 'canvas-confetti';


import { getPokemonInfo, localFavorites } from '../../utils';


interface Props {
    pokemon: Pokemon;
}

const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {
    const [isInFavorite, setisInFavorite] = useState(false)

    const onToggleFavorite = () => {
        localFavorites.toggleFavorite(pokemon.id)
        setisInFavorite(!isInFavorite)

        useEffect(() => {
            setisInFavorite(localFavorites.existInFavorites(pokemon.id));
        }, [pokemon.id]);


        if (isInFavorite) return

        confetti({
            zIndex: 999,
            particleCount: 100,
            spread: 160,
            angle: -100,
            origin: {
                x: 1,
                y: 0,
            }
        })

    }

    return (
        <Layout title={pokemon.name}>

            <Grid.Container css={{ marginTop: '5px' }} gap={2}>
                <Grid xs={12} sm={4}>
                    <Card hoverable css={{ padding: '30px' }}>
                        <Card.Body>
                            <Card.Image src={pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}
                                alt={pokemon.name}
                                width="100%"
                                height={200}>

                            </Card.Image>
                        </Card.Body>

                    </Card>
                </Grid>

                <Grid xs={12} sm={8}>
                    <Card>
                        <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Text h1 transform='capitalize'>
                                {pokemon.name}
                            </Text>

                            <Button color='gradient' ghost={!isInFavorite} onClick={onToggleFavorite}>
                                {isInFavorite ? 'En favoritos' : 'Guardar en favoritos'}
                            </Button>
                        </Card.Header>

                        <Card.Body>
                            <Text size={30}>
                                Sprites:
                            </Text>

                            <Container direction='row' display='flex' gap={0}>
                                <Image src={pokemon.sprites.front_default}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}>


                                </Image>
                                <Image src={pokemon.sprites.back_default}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}>


                                </Image>         <Image src={pokemon.sprites.front_shiny}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}>


                                </Image>         <Image src={pokemon.sprites.back_shiny}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}>


                                </Image>
                            </Container>
                        </Card.Body>
                    </Card>
                </Grid>
            </Grid.Container>
        </Layout>
    )
}




export const getStaticPaths: GetStaticPaths = async (ctx) => {
    const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');

    const pokemonNames: string[] = data.results.map((poke) => (poke.name));

    return {
        paths: pokemonNames.map(name => ({
            params: { name }
        })),
        fallback: false
    }

}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { name } = params as { name: string }

    return {
        props: { pokemon: await getPokemonInfo(name) }
    }

}

export default PokemonByNamePage;