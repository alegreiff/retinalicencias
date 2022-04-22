import mapKeys from 'lodash/mapKeys';
import sumBy from 'lodash/sumBy';
import lodashconcat from 'lodash/concat';
import useSWR from 'swr';
import { fetcher } from '..';
import Moment from 'moment';

export const usePeliculas = () => {
  reduceVisitas();
  const url_peliculas =
    'https://script.google.com/macros/s/AKfycbztzXBkzgYd4kgV3BAa1fi1-UQY8rgw4935BkyUt0-bEJJeTgrDHX1dIxqyzSDG03g/exec';
  const url_entradas =
    'https://script.google.com/macros/s/AKfycbxr1oxHPratNzgevO__yHbwXd4iQDrxVjOkW8eyI0qaC_xVAhBy_zYsiU933DXjFmuu/exec';

  const { data: dataPeliculas, error: errorPeliculas } = useSWR(
    url_peliculas,
    fetcher
  );
  const { data: dataEntradas, error: errorEntradas } = useSWR(
    url_entradas,
    fetcher
  );
  //return dataPeliculas;

  if (dataPeliculas && dataEntradas) {
    //console.log(dataEntradas.fechas[0]);
    //console.log(dataPeliculas.datos[0]);
    return relacionEntradas(dataPeliculas, dataEntradas);
  } else {
    return null;
  }
};

const relacionEntradas = (pelis, entradas) => {
  if (pelis) {
    //console.log(pelis[10]);

    let filmes = [];
    pelis.datos.forEach((peli) => {
      const entradasPeli = entradas.fechas.filter(
        (entrada) => entrada.peliculaId === peli.id
      );
      const item = {
        pais: peli.pais,
        titulo: peli.titulo,
        entradas: entradasPeli,
        visitas: reduceVisitas(peli.visitas),
      };
      filmes.push(item);
    });
    return filmes;
  } else {
    return 'NOLAS';
  }

  /* 
    crea un nuevo arreglo
    recorre películas

    
    en cada película busca entradas

    */
};

const reduceVisitas = (visitas) => {
  if (visitas) {
    const datos2016 = Object.entries(visitas['2016']);
    const datos2017 = Object.entries(visitas['2017']);
    const datos2018 = Object.entries(visitas['2018']);
    const datos2019 = Object.entries(visitas['2019']);
    const datos2020 = Object.entries(visitas['2020']);
    const datos2021 = Object.entries(visitas['2021']);
    const datos2022 = Object.entries(visitas['2022']);

    const totalVisitas = lodashconcat(
      datos2016,
      datos2017,
      datos2018,
      datos2019,
      datos2020,
      datos2021,
      datos2022
    );
    const res = totalVisitas.map((vis) => {
      const year = vis[0].substring(0, 4);
      const month = vis[0].substring(5, 7);
      return { year: Number(year), mes: Number(month), visitas: vis[1] };
    });

    const sumaYear = (year) => {
      return sumBy(res, function (dato) {
        if (dato.year === year) {
          return dato.visitas;
        }
      });
    };
    const resultado = [];
    resultado.push([2016, sumaYear(2016)]);
    resultado.push([2017, sumaYear(2017)]);
    resultado.push([2018, sumaYear(2018)]);
    resultado.push([2019, sumaYear(2019)]);
    resultado.push([2020, sumaYear(2020)]);
    resultado.push([2021, sumaYear(2021)]);
    resultado.push([2022, sumaYear(2022)]);

    const total = sumBy(resultado, function (dato) {
      return dato[1];
    });
    resultado.push(['TOTAL', total]);

    //console.log(resultado);
    const salida = {
      2016: sumaYear(2016),
      2017: sumaYear(2017),
      2018: sumaYear(2018),
      2019: sumaYear(2019),
      2020: sumaYear(2020),
      2021: sumaYear(2021),
      2022: sumaYear(2022),
      total,
    };
    return salida;
  } else {
    return 'XNOPO';
  }
};
