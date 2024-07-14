from pydantic import BaseModel

class PersonaBase(BaseModel):
    nombre: str
    apellido: str

class PersonaCreate(PersonaBase):
    pass

class Persona(PersonaBase):
    id: int

    class Config:
        orm_mode = True
