import { useRouter } from 'next/router';
import { useState } from 'react';
import NextImage from 'next/image';
import Table from 'components/table';
import axios from 'axios';
import safeJsonStringify from 'safe-json-stringify';
import { useToast } from 'context/toast';
import Modal from 'components/modal';
import Input from 'components/input';

export async function getServerSideProps(ctx) {
  const response = await axios.get('https://bienestarapi.herokuapp.com/api/hijos');
  const hijos = response.data;
  console.log('response ', hijos);
  return {
    props: { hijos: JSON.parse(safeJsonStringify(hijos)) },
  };
}

const Hijos = ({ hijos }) => {
  const [page, setPage] = useState(0);
  const { setToastState } = useToast();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [nombreHijo, setNombreHijo] = useState('');
  const router = useRouter();

  const agregarHijo = async (e) => {
    e.preventDefault();
    try {
      const data = {
        nombre: nombreHijo,
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

  const onClick = (e) => {
    e.preventDefault();
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
        <div className=' flex flex-col items-center h-1/4 place-content-center text-4xl '>
          <div className='text-center bg-aguaMarinaClaro  rounded p-4'>Hijos</div>
        </div>
        <div className='w-full sm:w-1/6 flex self-end'>
          <button className='btn-redirect  ' type='button' onClick={() => setOpenCreateModal(true)}>
            Agregar Niño
          </button>
        </div>
        <div className=' h-3/4  '>
          <Table registros={hijos} link={'/hijos/'} />
        </div>
      </div>
    </div>
  );
};

export default Hijos;
