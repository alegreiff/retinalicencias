import { getSession } from 'next-auth/react';

import React, { useContext, useEffect, useState, useMemo } from 'react';
import { Wrapper } from '../components/Wrapper';
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
} from '@chakra-ui/react';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { useTable, useSortBy, useGlobalFilter, useFilters } from 'react-table';
//import { authGoogle, googleSheets, hojaLicenciasRetina } from '../sheets';
//import orderBy from 'lodash/orderBy';
import Moment from 'moment';
import 'moment/locale/es';
import { EditaLicencia } from '../components/EditaLicencia';
import { useRouter } from 'next/router';
import { StoreContext } from '../store';
import { GlobalFilter } from '../components/tablas/GlobalFilter';
import { ColumnFilter } from '../components/tablas/ColumnFilter';
Moment.locale('es');

const PageLicencias = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activo, setActivo] = useState([]);
  const btnRef = React.useRef();

  const {
    state: { licencias },
  } = useContext(StoreContext);

  const [resultado, setResultado] = useState(licencias);

  const detalleLicencia = (e) => {
    const id = e.currentTarget.getAttribute('data-licencia');
    console.log('ACTIVO', id);
    const licencia = resultado.find(
      (res) => res.id.toString() === id.toString()
    );
    console.log('LICENCIA QUE VA', licencia);

    setActivo(licencia);
    //console.log("ACTIVO", licencia);
    onOpen();
  };

  const cierraDrawer = () => {
    console.log('tuito cerao');
    setActivo([]);
    onClose();
  };

  const data2 = useMemo(() => resultado, [resultado]);
  const defaultColumn = useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: ColumnFilter,
    }),
    []
  );
  const columns2 = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: '',
        Cell: ({ row: { original } }) => (
          <>
            <Button
              onClick={() => {
                router.push(`/edicion/${original.id}`);
              }}
            >
              Editar {original.id}
            </Button>
            {/* <Button
              colorScheme='teal'
              size='xs'
              onClick={detalleLicencia}
              data-licencia={original.id}
            >
              Ver {original.id}
            </Button> */}
          </>
        ),
        isNumeric: true,
        Filter: false,
      },
      /* { Header: 'Code', accessor: 'id', Filter: false }, */
      { Header: 'Creaci??n', accessor: 'fechacreacion', Filter: false },
      //{ Header: "Autor", accessor: "autor" },
      { Header: 'Pel??cula', accessor: 'nombrepelicula', Filter: ColumnFilter },
      { Header: 'Pa??s', accessor: 'pais' },
      //{ Header: "Tipo", accessor: "tipocontenido" },
      { Header: 'Adquisici??n', accessor: 'formaAdquisicion', Filter: false },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    { columns: columns2, data: data2, defaultColumn },
    useFilters,
    useGlobalFilter,
    useSortBy
  );

  const { globalFilter } = state;
  return (
    <>
      <Wrapper>
        <Drawer
          isOpen={isOpen}
          placement='top'
          onClose={cierraDrawer}
          finalFocusRef={btnRef}
          size='md'
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>
              Edici??n de la licencia de: {activo.nombrepelicula}
            </DrawerHeader>

            <DrawerBody>
              <EditaLicencia licencia={activo} cierra={cierraDrawer} />
            </DrawerBody>

            <DrawerFooter>
              <Button variant='outline' mr={3} onClick={cierraDrawer}>
                Cancel
              </Button>
              <Button colorScheme='blue'>Save</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        <>
          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}>
            <Table {...getTableProps()}>
              <Thead>
                {headerGroups.map((headerGroup, a) => (
                  <Tr key={a} {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column, b) => (
                      <Th
                        key={b}
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                        isNumeric={column.isNumeric}
                      >
                        {column.render('Header')}
                        <div>
                          {column.canFilter ? column.render('Filter') : null}
                        </div>
                        <chakra.span pl='4'>
                          {column.isSorted ? (
                            column.isSortedDesc ? (
                              <TriangleDownIcon aria-label='sorted descending' />
                            ) : (
                              <TriangleUpIcon aria-label='sorted ascending' />
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
                          {cell.render('Cell')}
                        </Td>
                      ))}
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </GlobalFilter>
        </>
        {activo && <span>{activo.nombrepelicula}</span>}
      </Wrapper>
    </>
  );
};

export default PageLicencias;

/* export async function getServerSideProps(context) {
  console.log('PASA RPO GETSERVEERSIDEPROPS');
  const session = await getSession(context);
  if (!session) {
    context.res.writeHead(302, { Location: '/' });
    context.res.end();
    return {};
  } else {
    const auth = authGoogle;

    const cargaLicencias = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId: hojaLicenciasRetina,
      range: 'matriz!A2:O',
    });

    const licencias = cargaLicencias.data.values
      ? cargaLicencias.data.values
      : [];

    let resultado = [];
    const y = Moment('13-03-2022 0:00', 'DD-MM-YYYY HH:mm').format(
      'MMMM D, YYYY HH:MM'
    );

    licencias.forEach((licencia) => {
      const fecha = Moment(licencia[1], 'DD-MM-YYYY HH:mm').format(
        'MMMM D, YYYY'
      );
      let entidadpais = '';
      let entidadgratis = '';
      if (licencia[6] === 'Compra') {
        entidadpais = licencia[7];
      } else {
        entidadgratis = licencia[7];
      }

      resultado.push({
        id: Number(licencia[0]),
        fechacreacion: fecha,
        autor: licencia[2],
        nombrepelicula: licencia[3],
        pais: licencia[4],
        tipocontenido: licencia[5],
        formaAdquisicion: licencia[6],
        entidad: licencia[7],
        geobloqueo: licencia[8],
        mododuracion: licencia[9] ? licencia[9] : '',
        comentarios: licencia[14] ? licencia[14] : '',
        startDate: licencia[10] ? licencia[10] : '',
        endDate: licencia[11] ? licencia[11] : '',
        nombreduracion: licencia[12] ? licencia[12] : '',
        numeroduracion: licencia[13] ? licencia[13] : '',
        entidadpais: entidadpais,
        entidadgratis: entidadgratis,
      });
    });
    resultado = orderBy(resultado, ['fechacreacion'], ['desc']);

    return {
      props: { resultado },
    };
  }
} */
