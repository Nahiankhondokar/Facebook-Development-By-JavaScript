import { toast } from "react-toastify";

// create toster
const CreateToaster = (message, type = "error") => {
  switch (type) {
    case "success":
      toast.success(message);
      break;

    case "error":
      toast.error(message);
      break;

    case "warn":
      toast.warn(message);
      break;

    case "info":
      toast.info(message);
      break;

    default:
      break;
  }
};

// export toaster
export default CreateToaster;
