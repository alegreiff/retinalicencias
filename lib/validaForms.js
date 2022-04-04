import * as Yup from "yup";

export const validaCreaPelicula = Yup.object({
  nombrepelicula: Yup.string()
    .required("El título de la película es un campo requerido")
    .min(4, "cuatro al menos"),
  formaAdquisicion: Yup.string().required("Seleccione la forma de adquisición"),
  tipocontenido: Yup.string().required("Seleccione el tipo de contenido"),
  pais: Yup.string().required("Seleccione el país"),
  //entidadpais: Yup.string().required("Seleccione la entidad"),
  entidadpais: Yup.string().when(["pais", "formaAdquisicion"], {
    is: (pais, formaAdquisicion) =>
      paisesRetina.includes(pais) && formaAdquisicion === "Compra",
    then: Yup.string().required(
      "Este campo es requerido cuando es una compra de un país Retina Latina"
    ),
  }),
  //entidadgratis: Yup.string().required("Seleccione la entidad"),
  entidadgratis: Yup.string().when("formaAdquisicion", {
    is: (formaAdquisicion) => formaAdquisicion === "Gratuita",
    then: Yup.string().required(
      "Este campo es requerido cuando es una llicencia gratuita"
    ),
  }),
  geobloqueo: Yup.string().required(
    "Seleccione el perfil inicial de geobloqueo. Sí no existe, seleccione América Latina y comuníquese con Jaime de Greiff"
  ),
  mododuracion: Yup.string().required(
    "Debe seleccionar un modo de duración. Si necesita aclaraciones utilice el campo de comentarios."
  ),
  numeroduracion: Yup.string().required("debei establecei el numero po"),
});
//pais === "Bolivia"
const paisesRetina = [
  "Bolivia",
  "Colombia",
  "Ecuador",
  "México",
  "Perú",
  "Uruguay",
];
