import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";

Modal.setAppElement('#root'); // Asegúrate de que este sea el elemento raíz de tu aplicación

const AddPersonModal = ({ isOpen, onRequestClose, onPersonAdded }) => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${Helper.url}/personas/`, {
        nombre,
        apellido,
      });
      onPersonAdded(response.data);
      onRequestClose();
    } catch (error) {
      setError("Error al agregar persona");
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2>Agregar Persona</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Apellido</label>
          <input
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
          />
        </div>
        <button type="submit">Agregar</button>
      </form>
    </Modal>
  );
};

export default AddPersonModal;
