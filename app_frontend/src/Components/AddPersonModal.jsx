import { useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '500px',
    padding: '20px',
    borderRadius: '8px',
  },
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  
  &:hover {
    background-color: #218838;
  }
`;

const ErrorMessage = styled.p`
  color: red;
`;

const AddPersonModal = ({ isOpen, onRequestClose, onPersonAdded }) => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://127.0.0.1:8000/personas/`, {
        nombre,
        apellido,
      });
      onPersonAdded(response.data);
      toast.success("Persona agregada con éxito!");
      onRequestClose();
    } catch (error) {
      toast.error("Error al agregar persona");
      setError("Error al agregar persona");
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onRequestClose}
      style={customStyles}
    >
      <h2>Agregar Persona</h2>
      <Form onSubmit={handleSubmit}>
        <div>
          <label>Nombre</label>
          <Input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Apellido</label>
          <Input
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
          />
        </div>
        <Button type="submit">Agregar persona</Button>
      </Form>
      <ToastContainer />
    </Modal>
  );
};

export default AddPersonModal;
