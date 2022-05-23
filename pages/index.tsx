import type { NextPage, GetStaticProps } from 'next'
import { Layout } from '../componets/layouts';
import { pokeApi } from '../api';
import { PokemonListResponse } from '../interfaces';
import { SmallPokemon } from '../interfaces/pokemon-list';
import { Grid } from '@nextui-org/react';
import { PokemonCard } from '../componets/pokemon';





interface Props {
  pokemons: SmallPokemon[];
}

const Home: NextPage<Props> = ({ pokemons }) => {

  return (




    <Layout title='Listado de Pokemons'>


      <Grid.Container gap={2} justify='flex-start'>
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />

        ))}
      </Grid.Container>






    </Layout>



  )
}




export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');
  const pokemons: SmallPokemon[] = data.results.map((poke, i) => ({
    ...poke,
    id: i + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i + 1}.svg`

  }))

  return {
    props: { pokemons }, // will be passed to the page component as props
  }

}


export default Home
