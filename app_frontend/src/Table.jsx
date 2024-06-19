import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Components/Loader";
import AddPersonModal from "./Components/AddPersonModal";

const Table = () => {
  const [persona, setPersona] = useState(null);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [personas, setPersonas] = useState([]);

  const Contenido = ({ persona }) => {
    return (
      <tr>
        <td>{persona.nombre}</td>
        <td>{persona.apellido}</td>
        <td>{persona.created_at}</td>
        <td>{persona.updated_at}</td>
        <td>
          <a href="#editEmployeeModal" className="edit" data-toggle="modal">
            <i className="material-icons" data-toggle="tooltip" title="Edit">
              
            </i>
          </a>
          <a href="#deleteEmployeeModal" className="delete" data-toggle="modal">
            <i className="material-icons" data-toggle="tooltip" title="Delete">
              
            </i>
          </a>
        </td>
      </tr>
    );
  };

  const Tabla = () => {
    return (
      <div className="table-responsive">
        <div className="table-wrapper">
          <div className="table-title">
            <div className="row">
              <div className="col-xs-6">
                <h2>
                  Admin UTCH -<b> FastApi & React.JS</b>
                </h2>
              </div>
              {/* Boton para modal de agregar persona */}
              <div className="col-xs-6">
                <a
                  className="btn btn-success"
                  onClick={() => setModalIsOpen(true)}
                >
                  <i className="material-icons"></i>{" "}
                  <span>Agregar persona</span>
                </a>
              </div>
            </div>
          </div>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Fecha de Creación</th>
                <th>Fecha de Actualización</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>{persona && <Contenido persona={persona} />}</tbody>
          </table>
        </div>
      </div>
    );
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/personas/")
      .then((response) => {
        setPersona(response.data);
        setLoader(true);
      })
      .catch((error) => {
        setError(error.toString());
        setLoader(true);
      });
  }, []);
  const handlePersonAdded = (newPerson) => {
    setPersonas([...personas, newPerson]);
  };
  if (loader) {
    if (error) {
      return <div>Error: {error}</div>;
    }
    return (
      <>
        <Tabla />
        <AddPersonModal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          onPersonAdded={handlePersonAdded}
        />
      </>
    );
  } else {
    return <Loader />;
  }
};

export default Table;
