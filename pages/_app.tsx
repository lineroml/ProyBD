import 'styles/globals.css';
import type { AppProps } from 'next/app';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { ToastContext } from 'context/toast';
import { useState, useEffect } from 'react';
import Script from 'next/script';

function MyApp({ Component, pageProps }: AppProps) {
  const [toastState, setToastState] = useState({
    message: '',
    type: '',
  });

  useEffect(() => {
    if (toastState.message !== '') {
      if (toastState.type === 'error') {
        toast.error(toastState.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      } else if (toastState.type === 'success') {
        toast.success(toastState.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      } else if (toastState.type === 'warning') {
        toast.warning(toastState.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    }
  }, [toastState]);

  return (
    <>
      <Script src='https://kit.fontawesome.com/433667d0d8.js' strategy='beforeInteractive' />
      <ToastContext.Provider value={{ setToastState }}>
        <Component {...pageProps} />
        <ToastContainer />
      </ToastContext.Provider>
    </>
  );
}
export default MyApp;
