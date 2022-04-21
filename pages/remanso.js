import { Box, SimpleGrid } from '@chakra-ui/react';
import orderBy from 'lodash/orderBy';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { Wrapper } from '../components/Wrapper';
import { fetcher } from '../lib';

const RemansoPage = () => {
  const URL =
    'https://script.google.com/macros/s/AKfycbztzXBkzgYd4kgV3BAa1fi1-UQY8rgw4935BkyUt0-bEJJeTgrDHX1dIxqyzSDG03g/exec';
  const { data, error } = useSWR(URL, fetcher);
  //console.log(data);
  const [films, setFilms] = useState(null);
  useEffect(() => {
    if (data) {
      const pelis = orderBy(data.datos, ['titulo'], ['asc']);
      setFilms(pelis);
    }
  }, [data]);

  if (!films) {
    return <>Errare</>;
  }
  return (
    <Wrapper>
      <SimpleGrid minChildWidth='222px' spacing='40px'>
        {films &&
          films.map((peli) => (
            <Box
              bg={peli.pais === 'Colombia' ? 'yellow' : 'grey'}
              key={peli.id}
              height='120px'
              padding={5}
            >
              {peli.titulo}
            </Box>
          ))}
      </SimpleGrid>
    </Wrapper>
  );
};

export default RemansoPage;

/* 
{
    "id": 1,
    "wpid": 324,
    "pais": "Colombia",
    "formato": "Cortos",
    "titulo": "Alguien mató algo",
    "genero": "Ficción",
    "estrenooriginal": "2016-03-04T05:00:00.000Z",
    "estreno": "2016-03-04T05:00:00.000Z",
    "salida": "2017-12-07T05:00:00.000Z",
    "year": 1999,
    "duracion": 27,
    
    }
}
*/
