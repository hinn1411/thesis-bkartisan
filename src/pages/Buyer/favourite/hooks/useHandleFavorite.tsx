import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { apiFavorite } from '@apis/apiFavorite';

export const useHandleFavorite = () => {
  const [isFavorite, setIsFavorite] = useState(true);
  const { mutate: deleteFavorite } = useMutation({
    mutationFn: async (id: number) =>
      await apiFavorite
        .toggleFavorites(id)
        .then(() => setIsFavorite((cur) => !cur)),
  });
  return {
    isFavorite,
    deleteFavorite,
  };
};
