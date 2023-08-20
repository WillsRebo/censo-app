import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listaPersonas: []
}

export const personasSlice = createSlice({
    name: 'listarPersonas',
    initialState,
    reducers: {
        guardarListaPersonas: (state, action) =>{
            state.listaPersonas=action.payload;
        },
        agregarPersonaLista: (state, action) => {
            state.listaPersonas.push(action.payload)
        },
        eliminarPersonaLista: (state, action) => {
            state.listaPersonas=state.listaPersonas.filter(elemento=> elemento.id !== action.payload)
            
        }
    }



})

export const {guardarListaPersonas, agregarPersonaLista,eliminarPersonaLista}=personasSlice.actions

export default personasSlice.reducer