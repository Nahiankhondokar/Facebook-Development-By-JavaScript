// intitla state
const intialState = {
  message: "",
  type: "error",
};

// toaster reducer function
const toasterReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case "":
      break;

    default:
      return state;
  }
};

// export function
export default toasterReducer;
