import { createContext, useReducer } from "react";
export const StoreContext = createContext();

export const ACTION_TYPES = {
  SET_MENU_ITEMS: "SET_MENU_ITEMS",
  SET_LICENCIAS: "SET_LICENCIAS",
  SET_DATOS_BASICOS: "SET_DATOS_BASICOS",
};

const storeReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_MENU_ITEMS: {
      return { ...state, elementosMenu: action.payload.elementosMenu };
    }

    case ACTION_TYPES.SET_LICENCIAS: {
      return { ...state, licencias: action.payload.licencias };
    }
    case ACTION_TYPES.SET_DATOS_BASICOS: {
      return { ...state, datosLicencias: action.payload.datosLicencias };
    }
    default:
      throw new Error(`ACCION DESCONOCIDA: ${action.type}`);
  }
};

const StoreProvider = ({ children }) => {
  const initialState = {
    licencias: [],
    datosLicencias: [],
    elementosMenu: [
      ["/settings", "Retina"],
      ["/licencias", "Licencias"],
    ],
  };
  const [state, dispatch] = useReducer(storeReducer, initialState);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
