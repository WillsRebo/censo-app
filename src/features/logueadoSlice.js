import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    usuarioLogueado: false,
}

export const usuarioLogueadoSlice = createSlice({
    name: "logueado",
    initialState,
    reducers:{
        loguear: (state, action) => {
            state.usuarioLogueado = action.payload;
        },

    }

});

export const {loguear} = usuarioLogueadoSlice.actions;
export default usuarioLogueadoSlice.reducer;