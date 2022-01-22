import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const errorNotify = (message) => {
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

  return toast(message, config);
};

const successNotify = (message) => {
  const config = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    type: 'success',
    theme: 'colored'
  };

  return toast(message, config);
};

export default { errorNotify, successNotify };
