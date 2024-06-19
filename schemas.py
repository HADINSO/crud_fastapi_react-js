from pydantic import BaseModel
from typing import Optional
import datetime

class PersonaBase(BaseModel):
    nombre: str
    apellido: str

class PersonaCreate(PersonaBase):
    pass

class Persona(PersonaBase):
    id: int
    created_at: Optional[datetime.datetime]
    updated_at: Optional[datetime.datetime]

    class Config:
        orm_mode = True
