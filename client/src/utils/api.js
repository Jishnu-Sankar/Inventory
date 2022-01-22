import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const handleSuccess = (resp) => resp.body;

export const handleError = (error) => {
  console.log('.......handleError', error);
  if (error.response) {
    throw error.response;
  } else {
    const response = { status: 500, body: { message: 'Internal Server error' } };
    throw response;
  }
};

export const dispatchError = (res) => {
  if (res.status === 401) {
    return window.location.replace('/register');
  }

  if (res.status === 404) {
    return window.location.replace('#/404');
  }

  const config = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    type: 'error',
    theme: 'colored'
  };

  toast(res.body.message, config);
  throw res;
};
