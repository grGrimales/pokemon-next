import { Card, Grid } from '@nextui-org/react';
import { useState, useEffect } from 'react';

import { Layout } from "../../componets/layouts";
import { FavoritePokemons } from '../../componets/pokemon';
import { NoFavorites } from "../../componets/ui";
import { localFavorites } from '../../utils';

const FavoritesPage = () => {

  const [favoritePokemons, setfavoritePokemons] = useState<number[]>([]);

  useEffect(() => {
    setfavoritePokemons(localFavorites.pokemons)
  }, [])
  return (
    <Layout title="Pokemons Favoritos">

      {
        favoritePokemons.length === 0 ? (<NoFavorites />) : (
          <FavoritePokemons pokemons={favoritePokemons} />
        )
      }
    </Layout>
  );
};

export default FavoritesPage;
