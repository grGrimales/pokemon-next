import { useState, useEffect } from 'react';

import { Layout } from "../../componets/layouts";
import { NoFavorites } from "../../componets/ui";
import { localFavorites } from '../../utils';

const FavoritesPage = () => {

  const [favoritePokemons, setfavoritePokemons] = useState<number[]>([]);

  useEffect(() => {
    setfavoritePokemons(localFavorites.pokemons)
  }, [])
  return (
    <Layout title="Pokemons Favoritos">
      <NoFavorites />
    </Layout>
  );
};

export default FavoritesPage;
