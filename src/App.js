import { Provider } from 'react-redux';
import Login from './components/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NoEncontrado from './components/NoEncontrado';
import Registro from './components/Registro';
import { store } from './store/store';
import Menu from './components/Menu';
import Dashboard from './components/Dashbord';
import './App.css';


let App = () => {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Menu />}>

            <Route path="/" element={<Login />} />
            <Route path="/Registro" element={<Registro />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/NoEncontrado" element={<NoEncontrado />} />

          </Route>

        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
