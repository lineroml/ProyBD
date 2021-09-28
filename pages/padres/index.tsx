import { useRouter } from 'next/router';
import { useState } from 'react';
import NextImage from 'next/image';
import Table from 'components/table';
import axios from 'axios';
import safeJsonStringify from 'safe-json-stringify';
import { useToast } from 'context/toast';
import Modal from 'components/modal';
import Input from 'components/input';
import Select from 'react-select';
import HeaderPage from 'components/headerPage';

export async function getServerSideProps(ctx) {
  const response = await axios.get('https://bienestarapi.herokuapp.com/api/padres');
  const padres = response.data;
  console.log('response ', padres);
  return {
    props: { padresProp: JSON.parse(safeJsonStringify(padres)) },
  };
}

const Padres = ({ padresProp }) => {
  const { setToastState } = useToast();
  const [padres, setPadres] = useState(padresProp);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [nombrePadre, setNombrePadre] = useState('');
  const router = useRouter();
  const [tipo, setTipo] = useState(null);

  const changeTipo = async (e) => {
    if (e.value === '2') {
      const resSinHijos = await axios.get('https://bienestarapi.herokuapp.com/api/padres/sinhijos');
      setPadres(resSinHijos.data);
    } else {
      const response = await axios.get('https://bienestarapi.herokuapp.com/api/padres');
      setPadres(response.data);
    }
    setTipo(e);
  };

  const selectStyles = {
    option: (styles) => ({
      ...styles,
      color: 'black',
      fontSize: '12px',
    }),
  };
  const agregarPadre = async (e) => {
    e.preventDefault();
    try {
      const data = {
        nombre: nombrePadre,
      };
      await axios.post(`https://bienestarapi.herokuapp.com/api/padres/`, data).then((res) => {
        if (res.status === 200) {
          setToastState({
            message: `Actualizado con éxito.`,
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
    <>
      <div className='h-screen animate-fade-in-down w-full flex flex-col justify-center items-center  '>
        <Modal open={openCreateModal} setOpen={setOpenCreateModal} modalTitle='Agregar Hijo'>
          <div className='flex space-y-3 flex-col '>
            <Input
              name='fathersName'
              text='Nombre Padre:  '
              value={nombrePadre}
              onChange={setNombrePadre}
              type='text'
            />
            <div className='w-full flex justify-end px-2'>
              <div className=' w-full sm:w-1/2   h-1/2'>
                <button onClick={(e) => agregarPadre(e)} type='button' className='btn-redirect'>
                  Crear{' '}
                </button>
              </div>
            </div>
          </div>
        </Modal>
        <div className='w-full px-4 sm:px-0 sm:w-4/6 h-5/6 flex flex-col place-content-center '>
          <HeaderPage title='Padres' />
          <div className=' flex flex-col items-center h-1/4 place-content-center text-4xl '>
            <div className='text-center bg-aguaMarinaClaro  rounded p-4'>Padres</div>
          </div>
          <div className='w-full py-4 flex flex-col sm:flex-row space-x-0 space-y-2 sm:space-y-0 sm:space-x-2 '>
            <div className='w-full sm:w-1/2 flex justify-center sm:justify-start '>
              <Select
                menuPlacement='bottom'
                menuPosition='fixed'
                className='w-3/4 sm:w-full  '
                defaultValue={[]}
                isSearchable
                name='child'
                styles={selectStyles}
                options={[
                  { value: '1', label: 'Todos' },
                  { value: '2', label: 'Sin Hijos' },
                ]}
                value={tipo}
                placeholder='Seleccione un tipo...'
                onChange={(selected) => changeTipo(selected)}
              />
            </div>
            <div className='w-full flex justify-center sm:justify-end'>
              <div className='w-3/4 sm:w-1/2 flex self-center sm:self-end'>
                <button
                  className='btn-redirect  '
                  type='button'
                  onClick={() => setOpenCreateModal(true)}
                >
                  Agregar Padre
                </button>
              </div>{' '}
            </div>
            <div></div>{' '}
          </div>
          <div className=' h-3/4  '>
            <Table registros={padres} link={'/padres/'} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Padres;
