import { loaderInitialState } from "./loaderInitialState";
import { LOADER_END, LOADER_START } from "./loaderTypes";

// create reducer
export const loaderReducer = (
  state = loaderInitialState,
  { type, payload }
) => {
  switch (type) {
    case LOADER_START:
      return 100;

    case LOADER_END:
      return 0;

    default:
      return state;
  }
};
