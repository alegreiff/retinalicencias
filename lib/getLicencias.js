import useSWR from "swr";
import { fetcher } from ".";

function useLicencias() {
  const { data, error } = useSWR(`/api/retina/matriz`, fetcher);
  //console.log(data);
  const datos = data?.data;
  /* if (datos) {
    const resultado = transformaLicencia(datos)[1];
    const columnas = transformaLicencia(datos)[0];
    console.log("res", resultado);
  } */

  return {
    licdata: datos,
    isLoading: !error && !data,
    isError: error,
  };
}
export default useLicencias;

export const transformaLicencia = (licencias) => {
  //console.log("TRANSFORMA LICENCIAS", licencias.length);
  const headers = [
    "id",
    "datecreation",
    "autor",
    "nombrepelicula",
    "pais",
    "tipocontenido",
    "formadeadquisicion",
  ];

  let columns = [
    { Header: "ID", accesor: "id" },
    { Header: "Creación", accesor: "datecreation" },
    { Header: "Autor", accesor: "autor" },
    { Header: "Película", accesor: "nombrepelicula" },
    { Header: "País", accesor: "pais" },
    { Header: "Tipo", accesor: "tipocontenido" },
    { Header: "Adquisición", accesor: "formadeadquisicion" },
  ];

  let resultado = [];

  licencias.forEach((licencia) => {
    resultado.push({
      id: licencia[0],
      fechacreacion: licencia[1],
      autor: licencia[2],
      pelicula: licencia[3],
      pais: licencia[4],
      tipocontenido: licencia[5],
      formaadquisicion: licencia[6],
    });
  });
  return [columns, resultado];
};
