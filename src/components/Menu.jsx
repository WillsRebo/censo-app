import { Outlet, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Menu = () => {
  let navigate=useNavigate();


    const estiloCustom = {
      textDecoration: 'none', 
      color: 'white'
    };



  const cerrarSesion = () => {
  localStorage.clear();
  navigate('/');
  };

  const existeUsuario = () => {
    if (localStorage.getItem('idUsuario')!==null) {
      return (
        <NavLink style={estiloCustom} onClick={cerrarSesion} to="/">
          Logout
        </NavLink>

      );
    }
  };
  return (
    <div className="contenedor menu">
      <header className="header">
      </header>
      <main>
        <nav className="logout nav justify-content-end">
          {existeUsuario()}
        </nav>

        <Outlet />
      </main>
    </div>
  );
};

export default Menu
