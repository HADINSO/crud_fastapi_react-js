# schemas.py
from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class PersonaBase(BaseModel):
    nombre: str
    apellido: str
    user_id: int

class PersonaCreate(PersonaBase):
    pass

class Persona(PersonaBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
