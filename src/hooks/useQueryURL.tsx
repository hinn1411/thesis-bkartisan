import { useLocation } from 'react-router-dom';

export const useQueryURL = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const params = {};

  for (const param of searchParams) {
    params[param[0]] = param[1];
  }

  return params;
};
