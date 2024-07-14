import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import api from '../api';
import PersonaForm from './PersonaForm';
import PersonaList from './PersonaList';

const AppContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

function App() {
  const [personas, setPersonas] = useState([]);
  const [selectedPersona, setSelectedPersona] = useState(null);

  const fetchPersonas = async () => {
    const response = await api.get('/personas/');
    setPersonas(response.data);
  };

  const selectPersona = (persona) => {
    setSelectedPersona(persona);
  };

  const clearSelection = () => {
    setSelectedPersona(null);
  };

  useEffect(() => {
    fetchPersonas();
  }, []);

  return (
    <AppContainer>
      <h1>CRUD Personas</h1>
      <PersonaForm
        fetchPersonas={fetchPersonas}
        selectedPersona={selectedPersona}
        clearSelection={clearSelection}
      />
      <PersonaList
        personas={personas}
        selectPersona={selectPersona}
        fetchPersonas={fetchPersonas}
      />
      <ToastContainer />
    </AppContainer>
  );
}

export default App;
