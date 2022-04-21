import { createContext, useReducer } from 'react';
export const StoreContext = createContext();

export const ACTION_TYPES = {
  SET_MENU_ITEMS: 'SET_MENU_ITEMS',
  SET_LICENCIAS: 'SET_LICENCIAS',
  SET_DATOS_BASICOS: 'SET_DATOS_BASICOS',
  MODIFICA_LICENCIA: 'MODIFICA_LICENCIA',
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
    case ACTION_TYPES.MODIFICA_LICENCIA: {
      const id = action.payload.id;
      const licencias = state.licencias.filter((lic) => lic.id !== Number(id));
      const nuevasLicencias = [...licencias, action.payload.licencia];
      console.log(nuevasLicencias);
      return {
        ...state,
        licencias: nuevasLicencias,
      };
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
      ['/nueva', 'Crear nueva licencia'],
      ['/licencias', 'Licencias'],
      ['/remanso', 'Test'],
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
