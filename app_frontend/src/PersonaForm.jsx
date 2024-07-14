import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import api from '../api';

const FormContainer = styled.div`
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 8px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin: 10px 0;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const PersonaForm = ({ fetchPersonas, selectedPersona, clearSelection }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');

  useEffect(() => {
    if (selectedPersona) {
      setNombre(selectedPersona.nombre);
      setApellido(selectedPersona.apellido);
    } else {
      setNombre('');
      setApellido('');
    }
  }, [selectedPersona]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedPersona) {
        await api.put(`/personas/${selectedPersona.id}`, { nombre, apellido });
        toast.success('Persona actualizada correctamente');
      } else {
        await api.post('/personas/', { nombre, apellido });
        toast.success('Persona creada correctamente');
      }
      fetchPersonas();
      clearSelection();
    } catch (error) {
      toast.error('Error al guardar la persona');
    }
  };

  return (
    <FormContainer>
      <h2>{selectedPersona ? 'Editar Persona' : 'Agregar Persona'}</h2>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          required
        />
        <Button type="submit">{selectedPersona ? 'Actualizar' : 'Crear'}</Button>
        {selectedPersona && <Button onClick={clearSelection} type="button">Cancelar</Button>}
      </form>
    </FormContainer>
  );
};

export default PersonaForm;
