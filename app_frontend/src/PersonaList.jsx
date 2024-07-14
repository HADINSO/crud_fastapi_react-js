import styled from 'styled-components';
import { toast } from 'react-toastify';
import api from '../api';

const ListContainer = styled.div`
  margin: 20px;
`;

const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 5px 0;
`;

const Button = styled.button`
  padding: 5px 10px;
  margin: 0 5px;
  background-color: ${(props) => props.bgColor || '#007bff'};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.hoverColor || '#0056b3'};
  }
`;

const PersonaList = ({ personas, selectPersona, fetchPersonas }) => {
  const handleDelete = async (id) => {
    try {
      await api.delete(`/personas/${id}`);
      toast.success('Persona eliminada correctamente');
      fetchPersonas();
    } catch (error) {
      toast.error('Error al eliminar la persona');
    }
  };

  return (
    <ListContainer>
      <h2>Lista de Personas</h2>
      {personas.map((persona) => (
        <ListItem key={persona.id}>
          <span>{persona.nombre} {persona.apellido}</span>
          <div>
            <Button onClick={() => selectPersona(persona)}>Editar</Button>
            <Button
              bgColor="#dc3545"
              hoverColor="#c82333"
              onClick={() => handleDelete(persona.id)}
            >
              Eliminar
            </Button>
          </div>
        </ListItem>
      ))}
    </ListContainer>
  );
};

export default PersonaList;
