import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const tostifyConfig = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

export const notifyError = (text) => toast.error(text, tostifyConfig);
export { ToastContainer };
