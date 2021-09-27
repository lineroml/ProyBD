import { useRouter } from 'next/router';
import { useState } from 'react';
import NextImage from 'next/image';
import Table from 'components/table';
const Hijos = ({ niños = [] }) => {
  const [page, setPage] = useState(0);

  const onClick = (e) => {
    e.preventDefault();
  };
  return (
    <div className='h-screen flex justify-center items-center  '>
      <div className='w-4/6 h-5/6 flex flex-col place-content-center '>
        <div className=' flex flex-col items-center h-1/4 place-content-center text-4xl '>
          <div className='text-center'>Niños</div>
        </div>
        <div className=' h-3/4 relative '>
          <Table registros={niños} link={'/hijos/'} />
        </div>
      </div>
    </div>
  );
};

export default Hijos;
