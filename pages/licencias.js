import React, { useContext, useEffect, useState, useMemo } from "react";
import { Wrapper } from "../components/Wrapper";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { useTable, useSortBy } from "react-table";
import { authGoogle, googleSheets, hojaLicenciasRetina } from "../sheets";
import orderBy from "lodash/orderBy";
import Moment from "moment";
import "moment/locale/es";
import { EditaLicencia } from "../components/EditaLicencia";
Moment.locale("es");

const PageLicencias = ({ resultado }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activo, setActivo] = useState([]);
  const btnRef = React.useRef();

  const detalleLicencia = (e) => {
    const id = e.currentTarget.getAttribute("data-licencia");
    console.log("ACTIVO", id);
    const licencia = resultado.find(
      (res) => res.id.toString() === id.toString()
    );

    setActivo(licencia);
    console.log("ACTIVO", licencia);
    onOpen();
  };

  const cierraDrawer = () => {
    setActivo([]);
    onClose();
  };

  const data2 = useMemo(() => resultado, [resultado]);
  const columns2 = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "",
        Cell: ({ row: { original } }) => (
          <>
            <Button
              colorScheme="teal"
              size="xs"
              onClick={detalleLicencia}
              data-licencia={original.id}
            >
              Ver {original.id}
            </Button>
          </>
        ),
        isNumeric: true,
      },
      { Header: "Code", accessor: "id" },
      { Header: "Creación", accessor: "fechacreacion" },
      //{ Header: "Autor", accessor: "autor" },
      { Header: "Película", accessor: "pelicula" },
      { Header: "País", accessor: "pais" },
      //{ Header: "Tipo", accessor: "tipocontenido" },
      { Header: "Adquisición", accessor: "formaadquisicion" },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns: columns2, data: data2 }, useSortBy);
  return (
    <>
      <Wrapper>
        <Drawer
          isOpen={isOpen}
          placement="top"
          onClose={cierraDrawer}
          finalFocusRef={btnRef}
          size="lg"
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>{activo.pelicula}</DrawerHeader>

            <DrawerBody>
              <EditaLicencia licencia={activo} />
            </DrawerBody>

            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={cierraDrawer}>
                Cancel
              </Button>
              <Button colorScheme="blue">Save</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        <Table {...getTableProps()}>
          <Thead>
            {headerGroups.map((headerGroup, a) => (
              <Tr key={a} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, b) => (
                  <Th
                    key={b}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    isNumeric={column.isNumeric}
                  >
                    {column.render("Header")}
                    <chakra.span pl="4">
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <TriangleDownIcon aria-label="sorted descending" />
                        ) : (
                          <TriangleUpIcon aria-label="sorted ascending" />
                        )
                      ) : null}
                    </chakra.span>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {rows.map((row, c) => {
              prepareRow(row);
              return (
                <Tr key={c} {...row.getRowProps()}>
                  {row.cells.map((cell, d) => (
                    <Td
                      key={d}
                      {...cell.getCellProps()}
                      isNumeric={cell.column.isNumeric}
                    >
                      {cell.render("Cell")}
                    </Td>
                  ))}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
        {activo && <span>{activo.pelicula}</span>}
      </Wrapper>
    </>
  );
};

export default PageLicencias;

export async function getServerSideProps() {
  const auth = authGoogle;

  const cargaLicencias = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId: hojaLicenciasRetina,
    range: "matriz!A2:O",
  });

  const licencias = cargaLicencias.data.values
    ? cargaLicencias.data.values
    : [];

  let resultado = [];
  const y = Moment("13-03-2022 0:00", "DD-MM-YYYY HH:mm").format(
    "MMMM D, YYYY HH:MM"
  );

  licencias.forEach((licencia) => {
    const fecha = Moment(licencia[1], "DD-MM-YYYY HH:mm").format(
      "MMMM D, YYYY"
    );

    resultado.push({
      id: Number(licencia[0]),
      fechacreacion: fecha,
      autor: licencia[2],
      pelicula: licencia[3],
      pais: licencia[4],
      tipocontenido: licencia[5],
      formaadquisicion: licencia[6],
    });
  });
  resultado = orderBy(resultado, ["fechacreacion"], ["desc"]);

  return {
    props: { resultado },
  };
}
