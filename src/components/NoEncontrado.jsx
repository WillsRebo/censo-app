import { Link } from 'react-router-dom';

const NoEncontrado = () => {
    return (
      <div>
          <h2>Página no encontrada</h2>
        <p>Vuelva al inicio <Link to="/">Procede al Login</Link></p>
      </div>
    )
  }
  
  export default NoEncontrado