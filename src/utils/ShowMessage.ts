import { toast } from 'react-toastify';

const showMessage = (message: string, type: 'warning' | 'error' | 'success' | 'info', option?: number) => {
    toast[type](message, {
        autoClose: option ? option : 1000,
        hideProgressBar: true,
        position: 'bottom-center',
        className: 'bg-boxdark-2 text-white',
    });
};

export default showMessage;
