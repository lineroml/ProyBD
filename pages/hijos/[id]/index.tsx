import { useRouter } from 'next/router';
import { useState } from 'react';
import NextImage from 'next/image';
import Input from 'components/input';
import Table from 'components/table';
import Card from 'components/card';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Modal from 'components/modal';
import axios from 'axios';
import safeJsonStringify from 'safe-json-stringify';
import { useToast } from 'context/toast';
import Select from 'react-select';
import HeaderPage from 'components/headerPage';
export async function getServerSideProps(context) {
  const { id } = context.query;
  let hijo;

  try {
    const responseHijo = await axios.get(`https://bienestarapi.herokuapp.com/api/hijos/${id}/`);
    hijo = responseHijo.data;
  } catch (e) {}
  return {
    props: {
      hijo: JSON.parse(safeJsonStringify(hijo ?? [])),
    },
  };
}

const Hijo = ({ hijo }) => {
  const [nombre, setNombre] = useState(hijo.nombre ?? '');
  const { setToastState } = useToast();

  const update = async (e) => {
    e.preventDefault();
    try {
      const data = {
        nombre: nombre,
        hijode: hijo.hijode,
      };
      await axios
        .put(`https://bienestarapi.herokuapp.com/api/hijos/${hijo.id}`, data)
        .then((res) => {
          if (res.status === 200) {
            setToastState({
              message: `Actualizado con éxito.`,
              type: 'success',
            });
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
    <div className='h-screen flex animate-fade-in-down flex-col justify-center  items-center  '>
      {/*DIVIDAMOS DOS SECCIONES DE 50% DE ALTURA PARA LOS COMPONENTES */}
      <div className='h-1/2 w-full flex-col-reverse  space-x-0 sm:space-x-4 sm:w-1/2 flex justify-center items-center border-b border-gray-400   sm:flex-row '>
        <HeaderPage title={nombre} />
        {/*TENEMOS 2 SECCIONES INTERNAS ,LA IZQUIERDA (NOMBRE Y ID) Y LA DE LA DERECHA( LA IMAGEN) */}
        <div className='w-full px-4 flex justify-center items-center flex-col space-y-3  '>
          {/*campos en fila de nombre, id y botón de editar , deben ser inputs para que sean modificables */}
          <Input name='name' text='Nombre:  ' value={nombre} onChange={setNombre} type='text' />
          <Input name='id' text='ID:  ' readOnly value={hijo.id} type='text' />
          <div className=' w-full sm:w-3/5 md:w-2/5 px-2 py-2 sm:py-0 flex justify-center self-end '>
            <button onClick={(e) => update(e)} type='button' className='btn-redirect  '>
              Guardar
            </button>
          </div>
        </div>
        <div className='w-full sm:w-1/3 h-full flex justify-center items-center  '>
          {' '}
          {/*lado izquierdo ponemos imagen */}
          <div className=' h-1/2 relative w-full flex items-center justify-center '>
            {/*definimos height y relative */}
            <NextImage
              src='/img/defaultImage.jpg'
              className='rounded-full' // height y witdh deben ser estaticos para el rounded
              width={200}
              height={200}
            />{' '}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hijo;
