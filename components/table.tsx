import { useRouter } from 'next/router';
import { useState } from 'react';
import NextImage from 'next/image';
import TablePagination from '@mui/material/TablePagination';
import axios from 'axios';
import { useToast } from 'context/toast';

const Table = ({ registros = [], link = '' }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const router = useRouter();
  const [esHijo] = useState(link === '/hijos/');
  const { setToastState } = useToast();
  const onClick = (e) => {
    e.prevendivefault();
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const deleteRegister = async (e, id) => {
    e.preventDefault();
    try {
      await axios.delete(`https://bienestarapi.herokuapp.com/api${link}${id}`).then((res) => {
        if (res.status === 200) {
          setToastState({
            message: `Eliminado con éxito.`,
            type: 'success',
          });
          router.reload();
        } else {
          setToastState({
            message: `Ha ocurrido un error`,
            type: 'error',
          });
        }
      });
    } catch (e) {
      console.log('error', e);
    }
  };

  return (
    <div className='flex items-center justify-center flex-col'>
      <div className='  w-full  rounded my-6'>
        <div className='text-left w-full border-collapse'>
          <div className='flex flex-row'>
            {/*HEADER */}
            <div className='text-center w-1/3 sm:w-1/4 px-1 sm:px-6 font-bold uppercase text-sm text-grey-dark border-b border-grey-light'>
              <div className='bg-aguaMarinaClaro  rounded-t-lg py-4'>Nombre</div>
            </div>
            <div
              className={`text-center w-1/3 ${
                !esHijo ? 'sm:w-1/5' : 'sm:w-1/4'
              } px-1 sm:px-6 font-bold uppercase text-sm text-grey-dark border-b border-grey-light`}
            >
              <div className='bg-aguaMarinaClaro rounded-t-lg py-4'>ID</div>
            </div>
            {!esHijo ? (
              <div className='text-center w-1/3 sm:w-1/5 px-1 sm:px-6 font-bold uppercase text-sm text-grey-dark border-b border-grey-light'>
                <div className='bg-aguaMarinaClaro rounded-t-lg py-4'>No. Hijos</div>
              </div>
            ) : null}
            {link === '/hijos/' ? (
              <div className='text-center w-1/3 sm:w-1/4 px-1 sm:px-6 font-bold uppercase text-sm text-grey-dark border-b border-grey-light'>
                <div className='bg-aguaMarinaClaro rounded-t-lg py-4'>Padre</div>
              </div>
            ) : null}
            <div
              className={` text-center w-1/3 ${
                esHijo ? 'sm:w-1/4 ' : 'sm:w-2/4 '
              }  px-1 sm:px-6 font-bold uppercase text-sm text-grey-dark border-b border-grey-light  `}
            >
              <div className='bg-aguaMarinaClaro    rounded-t-lg  py-4'>Acciones</div>
            </div>
          </div>
          <div className='bg-gray-200 rounded-xl p-4 flex flex-col'>
            {' '}
            {/* */}
            {registros
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((registro) => {
                return (
                  <div
                    key={registro.id}
                    className='hover:bg-grey-lighter text-center flex flex-row  border-b border-grey-lighter bg-gray-300  items-center sm:rounded-full rounded-3xl'
                  >
                    <div className='py-2 px-1 sm:px-6  w-1/4 '>
                      {registro.nombre ?? 'Sin Nombre'}
                    </div>
                    <div className={`py-2 px-1 sm:px-6  ${!esHijo ? 'w-1/4 sm:w-1/5' : 'w-1/4'}  `}>
                      {registro.id}
                    </div>
                    {!esHijo ? (
                      <div className='py-2 px-1 sm:px-6 sm:w-1/5 w-1/4'>
                        {' '}
                        {registro.numHijos ?? '0'}
                      </div>
                    ) : null}
                    {esHijo ? (
                      <div className='py-2 px-1 sm:px-6  w-1/4  '>
                        {registro?.nombrePadre ?? 'Sin Padre'}
                      </div>
                    ) : null}
                    <div
                      className={`py-2 px-1 sm:px-6  ${
                        esHijo ? 'sm:w-1/4 ' : 'sm:w-2/4 '
                      }   items-center space-x-0 sm:space-y-0 space-y-2 sm:space-x-4   self-center flex justify-center flex-col sm:flex-row  `}
                    >
                      <div className='h-full w-full sm:w-1/2 flex justify-center  '>
                        <button
                          onClick={() => router.push(`${link}${registro.id}`)}
                          type='button'
                          className='btn-redirect'
                        >
                          Ver{' '}
                        </button>
                      </div>

                      <div className={`  w-full sm:w-1/2   flex justify-center items-end `}>
                        <button
                          onClick={(e) => {
                            deleteRegister(e, registro.id);
                          }}
                          type='button'
                          className='btn-redirect'
                        >
                          Eliminar{' '}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component='div'
        count={registros.length}
        rowsPerPage={rowsPerPage}
        page={page}
        labelRowsPerPage='Filas por pagina'
        onPageChange={handleChange}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default Table;
