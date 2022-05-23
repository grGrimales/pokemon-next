import { useState } from 'react';

import { Layout } from '../../componets/layouts/Layout';
import { NextPage } from 'next';
import { GetStaticPaths, GetStaticProps } from 'next';


import { pokeApi } from '../../api';
import { Pokemon } from '../../interfaces';
import { Button, Card, Container, Grid, Text, Image } from '@nextui-org/react';
import { localFavorites } from '../../utils';




interface Props {
    pokemon: Pokemon;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
    const [isInFavorite, setisInFavorite] = useState(localFavorites.existInFavorites(pokemon.id))

    const onToggleFavorite = () => {
        localFavorites.toggleFavorite(pokemon.id)
        setisInFavorite(!isInFavorite)

    }


    console.log(pokemon)
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

    const pokemos151 = [...Array(151)].map((value, index) => `${index + 1}`)
    return {
        paths: pokemos151.map(id => ({
            params: { id }
        })),
        fallback: false
    }

}


export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { id } = params as { id: string }

    const { data } = await pokeApi.get<Pokemon>(`/pokemon/${id}`)

    return {
        props: { pokemon: data }, // will be passed to the page component as props
    }

}



export default PokemonPage;
