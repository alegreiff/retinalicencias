import { Input } from '@chakra-ui/react';

export const GlobalFilter = ({ filter, setFilter, children }) => {
  return (
    <>
      <span>
        Buscar: {''}
        <Input
          type='text'
          value={filter || ''}
          onChange={(e) => {
            setFilter(e.target.value);
          }}
        />
      </span>
      {children}
    </>
  );
};
