import { useRouter } from 'next/router';
import NextImage from 'next/image';

const Card = ({ name, id }) => {
  const router = useRouter();
  return (
    <div className='h-full flex p-4 flex-col space-y-2 justify-center items-center'>
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
