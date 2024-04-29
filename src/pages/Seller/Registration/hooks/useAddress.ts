import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import apiAddress from '../../../../apis/apiAdress';

export const useAddress = () => {
  const [currentCity, setCurrentCity] = useState();
  const [currentDistrict, setCurrentDistrict] = useState();
  const [currentWard, setCurrentWard] = useState();
  const {
    data: cities,
    isFetching,
    error,
  } = useQuery({
    queryKey: ['city'],
    queryFn: apiAddress.getCity,
    // initialData: [],
    refetchOnWindowFocus: false,
  });

  const { data: districts } = useQuery({
    queryKey: ['district', currentCity],
    queryFn: async () => {
      return await apiAddress.getDistrict(currentCity);
    },
    refetchOnWindowFocus: false,
    enabled: !!currentCity,
  });

  const { data: wards } = useQuery({
    queryKey: ['ward', currentDistrict],
    queryFn: async () => {
      return await apiAddress.getWard(currentDistrict);
    },
    refetchOnWindowFocus: false,
    enabled: !!currentDistrict,
  });

  return {
    cities,
    districts,
    wards,
    isFetching,
    currentCity,
    currentDistrict,
    currentWard,
    setCity: setCurrentCity,
    setDistrict: setCurrentDistrict,
    setWard: setCurrentWard,
    error,
  };
};
