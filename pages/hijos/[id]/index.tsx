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
import { useEffect } from 'react-transition-group/node_modules/@types/react';
import { useToast } from 'context/toast';

export async function getServerSideProps(context) {
  const { id } = context.query;
  let hijo;
  let padre;
  try {
    const responseHijo = await axios.get(`https://bienestarapi.herokuapp.com/api/hijos/${id}/`);
    hijo = responseHijo.data;
    const gotPadre = await axios.get(
      `https://bienestarapi.herokuapp.com/api/padres/${hijo.hijode}/`
    );
    padre = gotPadre.data;
  } catch (e) {}
  return {
    props: {
      hijo: JSON.parse(safeJsonStringify(hijo ?? [])),
      padre: JSON.parse(safeJsonStringify(padre ?? [])),
    },
  };
}

const hijo = ({ hijo, padre }) => {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [nombre, setNombre] = useState(hijo.nombre ?? '');
  const [nombreHijo, setNombreHijo] = useState('');
  const { setToastState } = useToast();
  const router = useRouter();
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  {
    /**De aqui a abajo no he cambiado nada xd */
  }
  const crear = async (e) => {
    e.preventDefault();
    try {
      const data = {
        hijo: hijo.id,
        hijode: padre.id,
      };

      await axios.post(`https://bienestarapi.herokuapp.com/api/hijos`, data).then((res) => {
        if (res.status === 200) {
          setToastState({
            message: `Creado con éxito.`,
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

  const update = async (e) => {
    e.preventDefault();
    try {
      const data = {
        nombre: nombre,
      };
      await axios
        .put(`https://bienestarapi.herokuapp.com/api/padres/${padre.id}`, data)
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
      <Modal open={openCreateModal} setOpen={setOpenCreateModal} modalTitle='Agregar Hijo'>
        <div className='flex space-y-3 flex-col '>
          <Input
            name='childName'
            text='Nombre Hijo:  '
            value={nombreHijo}
            onChange={setNombreHijo}
            type='text'
          />
          <div className='w-full flex justify-end px-2'>
            <div className=' w-full sm:w-1/2   h-1/2'>
              <button onClick={(e) => crear(e)} type='button' className='btn-redirect'>
                Crear{' '}
              </button>
            </div>
          </div>
        </div>
      </Modal>
      {/*DIVIDAMOS DOS SECCIONES DE 50% DE ALTURA PARA LOS COMPONENTES */}
      <div className='h-1/2 w-full flex-col-reverse  space-x-0 sm:space-x-4 sm:w-1/2 flex justify-center items-center border-b border-gray-400   sm:flex-row '>
        {/*TENEMOS 2 SECCIONES INTERNAS ,LA IZQUIERDA (NOMBRE Y ID) Y LA DE LA DERECHA( LA IMAGEN) */}
        <div className='w-full px-4 flex justify-center items-center flex-col space-y-3  '>
          {/*campos en fila de nombre, id y botón de editar , deben ser inputs para que sean modificables */}
          <Input name='name' text='Nombre:  ' value={nombre} onChange={setNombre} type='text' />
          <Input name='id' text='ID:  ' readOnly value={padre.id} type='text' />
          <div className=' w-full sm:w-3/5 md:w-1/5  py-2 sm:py-0 flex justify-center self-end '>
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
      <div className='w-full sm:w-1/2 px-4 flex flex-row '>
        <div className='w-1/2'>
          <button className=' btn-inverted'>Niños a cargo</button>
        </div>
        <div className='w-1/2 flex justify-end'>
          {' '}
          <button onClick={() => setOpenCreateModal(true)} className='btn-inverted'>
            Agregar
          </button>
        </div>
      </div>
      <div className='h-1/2 w-full px-2 sm:px-0 sm:w-2/3 flex justify-center items-center   '>
        {/*parte de abajo */}
        {/*card Gris */}
        <div className=' h-2/3 max-w-full'>
          {hijos.length > 0 ? (
            <Slider className='bg-gray-300   rounded-lg  ' {...settings}>
              {hijos.map((hijo) => {
                return <Card key={`hijo${hijo.id}`} name={hijo.nombre} id={hijo.id} />;
              })}
            </Slider>
          ) : (
            <div className=' bg-gray-300 p-4  rounded-lg  relative w-full flex items-center justify-center '>
              No tiene hijos.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Padre;
