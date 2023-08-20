import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { guardarListaPersonas, eliminarPersonaLista } from '../features/personasSlice'
import 'bootstrap/dist/css/bootstrap.min.css';

const ListarPersonas = () => {
    const dispatch = useDispatch()
    const personasStore = useSelector(state => state.listaPer.listaPersonas)
    const ocupacionesStore = useSelector(state => state.listaOcupacion.ocupaciones)


    const [mensaje, setMensaje] = useState('')
    const [personasFiltro, setPersonasFiltro] = useState(personasStore)

    const [hayMsj, setHayMsj] = useState(false)

    const slcOcupacion = useRef(null);


    const eliminarPersona = (id) => {
        setHayMsj(false)
        const url = `https://censo.develotion.com/personas.php?idCenso=${id}`;
        fetch(url, {
            method: 'DELETE',
            headers: {
                iduser: localStorage.getItem('idUsuario'),
                'Content-type': 'application/json; charset=UTF-8',
                apikey: localStorage.getItem('apikey')
            }
        }).then(response => {
            if (response.ok) {
                dispatch(eliminarPersonaLista(id))
                return response.json();
            } else {
                setHayMsj(true)
                throw new Error('No fue posible completar la acción vuelva a intentar');
            }
        }).then((datos) => {
            setHayMsj(true)
            setMensaje(datos.mensaje);
        }).catch(error => {
            setMensaje(error.message);
        });
    };

    useEffect(() => {
        setMensaje('')
        const idUsuario = localStorage.getItem('idUsuario');
        const url = `https://censo.develotion.com/personas.php?idUsuario=${idUsuario}`;
        try {
            fetch(url, {
                method: 'GET',
                headers: {
                    iduser: localStorage.getItem('idUsuario'),
                    'Content-type': 'application/json; charset=UTF-8',
                    apikey: localStorage.getItem('apikey')
                }
            }).then(response => response.json()
            ).then(datos => {
                setHayMsj(false)
                dispatch(guardarListaPersonas(datos.personas));
            })
        } catch (error) {
            setHayMsj(true);
            setMensaje(error.message);
        }
    }, []);  


    useEffect(() => {
        setPersonasFiltro(personasStore);
    }, [personasStore])



    const HandleFiltroChange = () => {
        setMensaje('')
        setHayMsj(false)
        const ocupacionId = parseInt(slcOcupacion.current.value);
        if (ocupacionId === 0) {
            setPersonasFiltro(personasStore);
        } else if (ocupacionId > 0 && ocupacionId <= 8) {
            setPersonasFiltro(personasStore.filter(persona => persona.ocupacion === ocupacionId));
        }      
    }

  
    return (
        <div className='container divAgrLisPer'>
            <h3 className="mb-3">Listar Personas</h3>

            <label className="" htmlFor="ocupacion">Filtrar por ocupación</label>
            <select className='w-100' id='ocupacion' ref={slcOcupacion} onChange={HandleFiltroChange}>
                <option className="optionFiltro" key={0}
                    value={0}>--- Sin Filtro ---
                </option>
                {ocupacionesStore.map(ocupacion =>
                    <option key={ocupacion.id}
                        value={ocupacion.id}>{ocupacion.ocupacion}
                    </option>)
                }
            </select>


            <div className="mt-2 border-top-2 p-1" style={{ maxHeight: '350px', overflowY: 'auto' }}>
                {personasFiltro.map((persona, i) =>
                    <p key={i} value={persona.id} >
                        <button className="btn btn-danger btn-sm me-2"
                            onClick={() => eliminarPersona(persona.id)}>Eliminar
                        </button>
                        <strong><em> {persona.nombre}</em></strong>
                    </p>
                )}
            </div>

            {hayMsj ? <div className='col-12 mt-3'><p>{mensaje}</p> </div> : ''}

        </div>
    );
};


export default ListarPersonas