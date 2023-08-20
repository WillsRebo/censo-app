import { Outlet, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


const Menu = () => {
  let navigate = useNavigate();


  const estiloCustom = {
    textDecoration: 'none',
    color: 'white'
  };



  const cerrarSesion = () => {
    localStorage.clear();
    navigate('/');
  };

  const existeUsuarioHeader = () => {
    return(
    localStorage.getItem('idUsuario') !== null ? <header className="header row"></header>:<header className="headerNull row"></header>
    )
  };

  const existeUsuario = () => {
    if (localStorage.getItem('idUsuario') !== null) {
      return (
        <NavLink className="logout ms-0" style={estiloCustom} onClick={cerrarSesion} to="/">
          Logout
        </NavLink>

      );
    }
  };
  return (
    <div className="container menu">
      {existeUsuarioHeader()}
      <main className="row">
        <nav className="nav justify-content-end col-12">
          {existeUsuario()}
        </nav>

        <Outlet className="col-12" />
      </main>
    </div>
  );
};

export default Menu
