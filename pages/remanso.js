import { Badge, Box, Center, SimpleGrid, Text } from '@chakra-ui/react';
import orderBy from 'lodash/orderBy';
import { useEffect, useState } from 'react';
import { Wrapper } from '../components/Wrapper';

import { usePeliculas } from '../lib/hooks/usePeliculas';
const RemansoPage = () => {
const data = usePeliculas();

  //console.log(data[158]);

  const [films, setFilms] = useState(null);
  useEffect(() => {
    const paisesRetina = [
      'Colombia',
      'Bolivia',
      'Ecuador',
      'México',
      'Uruguay',
      'Perú',
    ];
    if (data) {
      const pelis = data;
      pelis = orderBy(pelis, ['ranking'], ['desc']);
      setFilms(pelis);
    }
  }, []);

  if (!films) {
    return <Wrapper>C A R G A N D O</Wrapper>;
  }
  console.log(films[0]);
  return (
    <Wrapper>
      <SimpleGrid minChildWidth='300px' spacing='5px'>
        {films &&
          films.map((peli, index) => (
            <Box
              borderRadius={50}
              border='5px solid'
              borderColor='transparent'
              bg={
                peli.pais === 'Colombia'
                  ? 'retina.colombia'
                  : peli.pais === 'Uruguay'
                  ? 'retina.uruguay'
                  : peli.pais === 'Perú'
                  ? 'retina.peru'
                  : peli.pais === 'Bolivia'
                  ? 'retina.bolivia'
                  : peli.pais === 'Ecuador'
                  ? 'retina.ecuador'
                  : peli.pais === 'México'
                  ? 'retina.mexico'
                  : 'polla.negro'
              }
              key={peli.id}
              height='250px'
              //padding={0}
            >
              {/* <Badge> {peli.pais} </Badge> */}
              <Center padding={10} margin={5} backgroundColor='polla.negro'>
                <div>
                  <Text> {peli.titulo} </Text>
                </div>
                <div>
                  <Badge> {peli.ranking} </Badge>
                </div>
                {/* <Text>{peli.visitas.total}</Text> */}
                {/* <Text
                      padding={2}
                      borderRadius={50}
                      color='polla.lux'
                      fontWeight='extrabold'
                      fontSize={30}
                      backgroundColor='red'
                    >
                      {Moment(peli.estrenooriginal)
                        .format('YY')
                        .toString()
                        .charAt(1)}
                    </Text> */}
              </Center>
            </Box>
          ))}
      </SimpleGrid>
    </Wrapper>
  );
};

export default RemansoPage;

/* 

const fecha = Moment(peli.estrenooriginal, 'DD-MM-YYYY HH:mm').format(
        'MMMM D, YYYY'
      );
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
