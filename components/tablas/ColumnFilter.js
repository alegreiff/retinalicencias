import { Input } from '@chakra-ui/react';

export const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column;
  return (
    <Input
      type='text'
      value={filterValue || ''}
      onChange={(e) => {
        setFilter(e.target.value);
      }}
    />
  );
};
