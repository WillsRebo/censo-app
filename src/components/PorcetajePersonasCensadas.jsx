import { useEffect, useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import 'bootstrap/dist/css/bootstrap.min.css';

const PorcetajePersonasCensadas = () => {


    const [censoTot, setCensoTot] = useState(0)

    const censosUsuario = useSelector(state => state.listaPer.listaPersonas).length;
    const porcentajeCenso = (censosUsuario * 100 / censoTot).toFixed(3);


    useEffect(() => {
        const url = 'https://censo.develotion.com/totalCensados.php';
        fetch(url, {
            method: 'GET',
            headers: {
                iduser: localStorage.getItem('idUsuario'),
                'Content-type': 'application/json; charset=UTF-8',
                apikey: localStorage.getItem('apikey')
            }
        }).then(r => r.json())
            .then(datos => setCensoTot(datos.total)

            );
    }, []);


    return (
        <div className="porcentajePersonas">
            <h3>Porcetaje Personas Censadas</h3>
            <div className='divPorcentaje mt-4'>
                <p>{porcentajeCenso}</p>
            </div>
        </div>
    )
}

export default PorcetajePersonasCensadas