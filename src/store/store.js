import { configureStore } from "@reduxjs/toolkit";
import personasReducer from '../features/personasSlice'
import logueadoReducer from "../features/logueadoSlice";
import departamentosReducer from '../features/departamentosSlice';
import ocupacionesReducer from '../features/ocupacionesSlice'

export const store = configureStore({
    reducer: {
        listaPer: personasReducer,
        usuarioLogueado: logueadoReducer,
        listaDepas: departamentosReducer,
        listaOcupacion:ocupacionesReducer
    }
});