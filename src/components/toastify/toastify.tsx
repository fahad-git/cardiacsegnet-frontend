
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export function toastsuccess(message:string) {
    toast.success(message)
}

export function toasterror(message:string) {
    toast.error(message)
}