import { useRouter } from 'next/router';
import NextImage from 'next/image';
import Modal from 'components/modal';
import axios from 'axios';
import { useToast } from 'context/toast';
import { useState } from 'react';

const Card = ({ name, id }) => {
  const router = useRouter();
  const { setToastState } = useToast();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const abandonarHijos = async (e, id) => {
    e.preventDefault();
    try {
      const data = {
        nombre: name,
        hijode: null,
      };

      await axios.put(`https://bienestarapi.herokuapp.com/api/hijos/${id}`, data).then((res) => {
        if (res.status === 200) {
          setToastState({
            message: `Abandonado con éxito.`,
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
    <div className='h-full flex   flex-col space-y-2 justify-center items-center '>
      <Modal open={openDeleteModal} setOpen={setOpenDeleteModal} modalTitle='Abandonar Hijo'>
        <div className='flex space-y-3 flex-col '>
          <div className='w-full flex justify-end px-2'>
            ¿Estás seguro que deseas abandonar a tu hijo? (Ten presente que esto puede tener
            repercusiones legales)
          </div>
          <div className='w-full flex justify-end space-x-2 px-2'>
            <div className=' w-full sm:w-1/2   h-1/2'>
              <button
                onClick={(e) => setOpenDeleteModal(false)}
                type='button'
                className=' btn-cancel'
              >
                Conservar{' '}
              </button>
            </div>
            <div className=' w-full sm:w-1/2   h-1/2'>
              <button onClick={(e) => abandonarHijos(e, id)} type='button' className='btn-redirect'>
                Abandonar{' '}
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <div className='flex w-full justify-end  '>
        <button onClick={() => setOpenDeleteModal(true)} className='btn-inverted'>
          <i className='far fa-trash-alt' />
        </button>
      </div>
      <div className=' h-2/3 relative w-full flex items-center justify-center '>
        {/*definimos height y relative */}
        <NextImage
          src='/img/defaultImage.jpg'
          className='rounded-full' // height y witdh deben ser estaticos para el rounded
          width={150}
          height={150}
        />{' '}
      </div>
      <div>{name}</div>
      <div>{id}</div>
    </div>
  );
};

export default Card;
