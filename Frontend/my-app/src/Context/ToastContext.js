import { createContext} from "react";
import { toast ,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ToastContext=createContext()
export const ToastContextProvider=({children})=>{
    return(
        <ToastContext.Provider value={{toast}}>
        <ToastContainer autoClose={2000}/>
        {children}</ToastContext.Provider>

    )
    

}

export default ToastContext