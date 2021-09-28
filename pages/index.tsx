import { useState } from 'react';
import NextImage from 'next/image';
import Router, { useRouter } from 'next/router';

const Home = () => {
  const [page, setPage] = useState(0);
  const router = useRouter();

  return (
    <div className='h-screen animate-fade-in-down flex justify-center items-center  '>
      <div className='w-4/6 h-5/6 flex flex-col place-content-center '>
        <div className=' flex flex-col items-center h-1/4 place-content-center text-4xl '>
          <div className='text-center font-semibold'>Sistema Información</div>
          <div className='font-semibold'>ICBF</div>
        </div>
        <div className=' h-2/4 relative '>
          <NextImage src='/img/family.svg' objectFit='contain' layout='fill' />{' '}
        </div>
        <div className=' h-1/4 sm:w-3/5 items-center space-x-0 sm:space-y-0 space-y-2 sm:space-x-4  w-full self-center flex flex-col sm:flex-row   '>
          <div className=' w-full sm:w-1/2 flex justify-center h-1/2'>
            <button
              onClick={() => router.push('/padres')}
              type='button'
              className='btn-redirect text-3xl'
            >
              Padres{' '}
            </button>
          </div>
          <div className=' w-full sm:w-1/2 flex justify-center h-1/2'>
            <button
              onClick={() => router.push('/hijos')}
              type='button'
              className='btn-redirect text-3xl'
            >
              Niños{' '}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
