import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { agregarPersonaLista } from '../features/personasSlice';
import { guardarListaDepartamentos } from '../features/departamentosSlice'
import { guardarListaOcupaciones } from '../features/ocupacionesSlice';
import 'bootstrap/dist/css/bootstrap.min.css';


const AgregarPersona = () => {
    const nombre = useRef(null)
    const slcDepto = useRef(null);
    const slcCiudad = useRef(null);
    const slcOcupacion = useRef(null);
    const fcNacim = useRef(null);

    const dispatch = useDispatch();

    const [esMayor, setEsMayor] = useState(null)

    const [RespuestaApi, setRespuestaApi] = useState(false)
    const [msjAPI, setMsjAPI] = useState("")

    const [ciudades, setCiudades] = useState([]);
    const [fNacimiento, setFechaNacimiento] = useState(null)
    const [ocupaciones, setOcupaciones] = useState([]);

    const departamentosStore = useSelector(state => state.listaDepas.departamentos)

    ////////CARGA DE DEPARTAMENTOS
    useEffect(() => {
        const url = 'https://censo.develotion.com/departamentos.php';

        fetch(url, {
            method: 'GET',
            headers: {
                iduser: localStorage.getItem('idUsuario'),
                'Content-type': 'application/json; charset=UTF-8',
                apikey: localStorage.getItem('apikey')

            }

        }).then(response => response.json())
            .then((datos) => {
                dispatch(guardarListaDepartamentos(datos.departamentos))
            })
    }, []);



    ///////CARGA COMBO CIUDADES
    const cambiarCiudades = () => {
        const url = `https://censo.develotion.com/ciudades.php?idDepartamento=${slcDepto.current.value}`;
        fetch(url, {
            method: 'GET',
            headers: {
                iduser: localStorage.getItem('idUsuario'),
                'Content-type': 'application/json; charset=UTF-8',
                apikey: localStorage.getItem('apikey')
            }
        }
        ).then(r => r.json()
        ).then(datos => setCiudades(datos.ciudades));
    };


    useEffect(() => {
        const url = 'https://censo.develotion.com/ocupaciones.php';
        fetch(url, {
            method: 'GET',
            headers: {
                iduser: localStorage.getItem('idUsuario'),
                'Content-type': 'application/json; charset=UTF-8',
                apikey: localStorage.getItem('apikey')
            }
        }).then(r => r.json())
            .then(datos => {
                setOcupaciones(datos.ocupaciones)
                dispatch(guardarListaOcupaciones(datos.ocupaciones))
            });
    }, [esMayor]);

    useEffect(() => {
        calcularEdad();
    }, [fNacimiento]);

    const agregarPer = () => {
        setRespuestaApi(false);
        if (verifCampos()) {
            if (new Date(fNacimiento) <= new Date()) {
                let idUsuario = localStorage.getItem('idUsuario');
                let nom = nombre.current.value;
                let depto = slcDepto.current.value;
                let ciudad = slcCiudad.current.value;
                let fdn = fcNacim.current.value;
                let dedica = slcOcupacion.current.value;


                const url = `https://censo.develotion.com/personas.php`;
                const datos = {
                    idUsuario: parseInt(idUsuario),
                    nombre: nom,
                    departamento: parseInt(depto),
                    ciudad: parseInt(ciudad),
                    fechaNacimiento: fdn,
                    ocupacion: parseInt(dedica),
                    id: 0
                };
                fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(datos),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                        apikey: localStorage.getItem('apikey'),
                        iduser: localStorage.getItem('idUsuario')
                    }
                }).then(response => response.json())
                    .then(json => {
                        if (json.codigo === 200) {
                            datos.id = json.idCenso
                            console.log(datos.id)
                            dispatch(agregarPersonaLista(datos))
                            limpiarCampos();
                        }
                    })
                    .catch(error => {
                        setRespuestaApi(true)
                        setMsjAPI(error.message);
                    });
            } else {
                setRespuestaApi(true)
                setMsjAPI("La fecha de nacimiento no puede ser posterior al día del censo")
            }
        } else {
            setRespuestaApi(true)
            setMsjAPI("Verifique haya completado todos los campos")
        }
    };

    const calcularEdad = () => {
        const fechaNacimientoDate = new Date(fNacimiento);
        const fechaActual = new Date();

        const diferenciaMilisegundos = fechaActual - fechaNacimientoDate;
        const miliSegAño = 1000 * 60 * 60 * 24 * 365.25;
        const edad = Math.floor(diferenciaMilisegundos / miliSegAño);
        const mayoriaEdad = 18;
        setEsMayor(edad >= mayoriaEdad);
    };


    const handleInputDOF = (event) => {
        setFechaNacimiento(event.target.value);
    }

    const limpiarCampos = () => {
        nombre.current.value = '';
        slcDepto.current.value='';
        slcCiudad.current.value = '';
        slcOcupacion.current.value = '';
        fcNacim.current.value = '';
    }

    const verifCampos = () => {
        let nom = nombre.current.value;
        let ciudad = slcCiudad.current.value;
        let ocupacion = slcOcupacion.current.value;
        let fnacim = fcNacim.current.value;

        if (nom !== '' && ciudad !== '' && ocupacion !== '' && fnacim !== '') {
            return true;
        } else {
            return false;
        }
    }


    return (


        <div className='container divAgrLisPer'>
            <div className='row'>
                <form action="" id="agregarPersona">

                    <h3>Agregar Persona</h3>

                    <label htmlFor="nombre">Nombre</label>
                    <input className='col-8 mb-1 w-100' id='nombre' type='text' ref={nombre} required />

                    <label htmlFor="departamento"  >Departamento</label>
                    <select className='w-100' id="departamento" ref={slcDepto} onChange={cambiarCiudades}>
                        <option key={0}
                            value={0}>
                        </option>
                        {departamentosStore.map(dep =>
                            <option key={dep.id}
                                value={dep.id}>{dep.nombre}
                            </option>)}
                    </select>


                    <label htmlFor="ciudad">Ciudad</label>
                    <select className='w-100' name="" id="ciudad" ref={slcCiudad}>
                        {ciudades.map(ciudad =>
                            <option key={ciudad.id}
                                value={ciudad.id}>{ciudad.nombre}
                            </option>)}
                    </select>

                    <label htmlFor="fnac">Fecha de nacimiento</label>
                    <input type="date" id='fnac' ref={fcNacim} onChange={handleInputDOF} required />

                    <label htmlFor="ocupacion">Ocupación</label>
                    <select className='w-100' id='ocupacion' name="" ref={slcOcupacion}>
                        <option key={0}
                            value={0}>
                        </option>
                        {esMayor ?
                            ocupaciones.map(ocupacion =>
                                <option key={ocupacion.id}
                                    value={ocupacion.id}>{ocupacion.ocupacion}
                                </option>
                            ) :
                            <option key={5}
                                value={5}>Estudiante
                            </option>
                        }
                    </select>
                </form>


                <button type='button'
                    className='btn btn-primary btnAgPersona px-1 mt-5'
                    onClick={agregarPer}>
                    Agregar Persona
                </button>
            </div>
            {RespuestaApi ? <div className='col-12 mt-3'><p>{msjAPI}</p> </div> : ''}

        </div>



    );
};


export default AgregarPersona;

