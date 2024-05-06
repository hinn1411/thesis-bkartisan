import { memo, FC } from 'react';

interface HeaderName {
    name: string
}

const HeaderSeller: FC<HeaderName> = memo(({name}) => {
  return (
    <div>{name}</div>
  );

});

export default HeaderSeller;
