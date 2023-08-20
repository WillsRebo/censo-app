import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import 'bootstrap/dist/css/bootstrap.min.css';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const Mapa = () => {

    const personas = useSelector(state => state.listaPer.listaPersonas);
    const departamentosStore = useSelector(state => state.listaDepas.departamentos);

    let arrayAuxiliar = [];

    for (let i = 0; i < departamentosStore.length; i++) {
      const dep = departamentosStore[i];
      const objeto = {
        id: parseInt(dep.id),
        nombre: dep.nombre,
        latitud: dep.latitud,
        longitud: dep.longitud,
        total: 0,
      };

      for (let e = 0; e < personas.length; e++) {
        const per = personas[e];
        if (per.departamento === objeto.id) {
          objeto.total += 1;
        }
      }
      arrayAuxiliar.push(objeto);      
    }





    return (
        <div>
            <h3>Personas Censadas por Departamento</h3>
            <MapContainer center={[-33, -56]} zoom={7} scrollWheelZoom={false} style={{ height: "400px", width: "100%" }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {arrayAuxiliar.map((valor,i) => <Marker key={i} position={[ valor.latitud, valor.longitud]}>
                    <Popup>
                         {valor.nombre}  <br /> Cantidad de censados: <strong>{valor.total}</strong>
                    </Popup>
                </Marker>)}
            </MapContainer>
        </div>
    )
}

export default Mapa