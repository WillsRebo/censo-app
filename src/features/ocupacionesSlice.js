import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    ocupaciones: []
}

export const ocupacionesListaSlice = createSlice({
    name: "ocupaciones",
    initialState,
    reducers:{
        guardarListaOcupaciones: (state, action) =>{
            state.ocupaciones=action.payload;
        },

    }

});

export const {guardarListaOcupaciones} = ocupacionesListaSlice.actions;
export default ocupacionesListaSlice.reducer;