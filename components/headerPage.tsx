import Head from 'next/head';
import { useRouter } from 'next/router';

const HeaderPage = ({ title }) => {
  const router = useRouter();

  return (
    <div className='flex justify-start  '>
      <Head>
        <title>{title}</title>
      </Head>
      <h1 className='flex'>
        <button
          type='button'
          className='mr-2 focus:outline-none flex items-center btn-redirect'
          onClick={() => router.back()}
        >
          <i className=' sm:px-6 px-2 fas fa-arrow-left text-2xl text-black hover:text-opacity-80' />
        </button>
      </h1>
    </div>
  );
};

export default HeaderPage;
