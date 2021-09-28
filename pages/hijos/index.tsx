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
  const response = await axios.get('https://bienestarapi.herokuapp.com/api/hijos');
  const hijos = response.data;
  console.log('response ', hijos);
  return {
    props: { hijosProp: JSON.parse(safeJsonStringify(hijos)) },
  };
}

const Hijos = ({ hijosProp }) => {
  const [page, setPage] = useState(0);
  const [hijos, setHijos] = useState(hijosProp);
  const { setToastState } = useToast();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [nombreHijo, setNombreHijo] = useState('');
  const router = useRouter();
  const [tipo, setTipo] = useState(null);

  const selectStyles = {
    option: (styles) => ({
      ...styles,
      color: 'black',
      fontSize: '12px',
    }),
  };

  const agregarHijo = async (e) => {
    e.preventDefault();
    try {
      const data = {
        nombre: nombreHijo,
        hijode: null,
      };
      await axios.post(`https://bienestarapi.herokuapp.com/api/hijos/`, data).then((res) => {
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

  const changeTipo = async (e) => {
    if (e.value === '2') {
      const resSinPadre = await axios.get('https://bienestarapi.herokuapp.com/api/hijos/sinpadre');
      setHijos(resSinPadre.data);
    } else {
      const response = await axios.get('https://bienestarapi.herokuapp.com/api/hijos');
      setHijos(response.data);
    }
    setTipo(e);
  };

  return (
    <div className='h-screen animate-fade-in-down w-full flex justify-center items-center  '>
      <Modal open={openCreateModal} setOpen={setOpenCreateModal} modalTitle='Agregar Niño'>
        <div className='flex space-y-3 flex-col '>
          <Input
            name='sonsName'
            text='Nombre Hijo:  '
            value={nombreHijo}
            onChange={setNombreHijo}
            type='text'
          />
          <div className='w-full flex justify-end px-2'>
            <div className=' w-full sm:w-1/2   h-1/2'>
              <button onClick={(e) => agregarHijo(e)} type='button' className='btn-redirect'>
                Crear{' '}
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <div className='w-full px-4 sm:px-0 sm:w-4/6 h-5/6 flex flex-col place-content-center '>
        <HeaderPage title='Hijos' />
        <div className=' flex flex-col items-center h-1/4 place-content-center text-4xl '>
          <div className='text-center bg-aguaMarinaClaro  rounded p-4'>Hijos</div>
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
                { value: '2', label: 'Huerfanos' },
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
                Agregar Niño
              </button>
            </div>{' '}
          </div>
          <div></div>{' '}
        </div>
        <div className=' h-3/4  '>
          <Table registros={hijos} link={'/hijos/'} />
        </div>
      </div>
    </div>
  );
};

export default Hijos;
