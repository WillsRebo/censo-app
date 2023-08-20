import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    departamentos: []
}

export const departamentosListaSlice = createSlice({
    name: "deptos",
    initialState,
    reducers:{
        guardarListaDepartamentos: (state, action) =>{
            state.departamentos=action.payload;
        },

    }

});

export const {guardarListaDepartamentos} = departamentosListaSlice.actions;
export default departamentosListaSlice.reducer;