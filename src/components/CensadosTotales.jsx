import { useEffect, useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import 'bootstrap/dist/css/bootstrap.min.css';



const CensadosTotales = () => {

    const personasStore = useSelector(state => state.listaPer.listaPersonas);
    const [personasMontevideo, setpersonasMontevideo] = useState([])

    useEffect(() => {

        setpersonasMontevideo(personasStore.filter(
            persona => persona.departamento === 3218))

    }, [personasStore])

    const totalCensadas = personasStore.length;
    const censadasMvdo = personasMontevideo.length;
    const diferencia = totalCensadas - censadasMvdo;

    return (
        <div className="container">
            <h3 className="mb-3">Censados Totales</h3>
            <div className="row">
                <p className="txtCensadosTotales col-12">Total de personas censadas: <span className="numCensadosTotales numCenso">{totalCensadas}</span></p>
                <p className="txtCensadosTotales col-6">Total de personas censadas en Montevideo: <span className="numCensadosMon numCenso">{censadasMvdo}</span></p>
                <p className="txtCensadosTotales col-6" >Total de personas censadas en el resto del país: <span className="numCensadosResto numCenso">{diferencia}</span></p>
            </div>
        </div>

    )
}

export default CensadosTotales