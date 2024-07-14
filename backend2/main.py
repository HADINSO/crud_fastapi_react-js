from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware
DATABASE_URL = "mysql+mysqlconnector://root:@localhost/fast"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

app = FastAPI()
# Configuración de CORS
origins = [
    "http://localhost:3000",  # Reemplaza con el puerto de tu aplicación React
    "http://localhost:5173",  # Asegúrate de incluir el puerto correcto donde corre tu frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class Persona(Base):
    __tablename__ = 'persona'
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(50))
    apellido = Column(String(50))

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class PersonaCreate(BaseModel):
    nombre: str
    apellido: str

class PersonaUpdate(BaseModel):
    nombre: str
    apellido: str

class PersonaOut(BaseModel):
    id: int
    nombre: str
    apellido: str

    class Config:
        orm_mode = True

@app.post("/personas/", response_model=PersonaOut)
def create_persona(persona: PersonaCreate, db: Session = Depends(get_db)):
    db_persona = Persona(nombre=persona.nombre, apellido=persona.apellido)
    db.add(db_persona)
    db.commit()
    db.refresh(db_persona)
    return db_persona

@app.get("/personas/", response_model=List[PersonaOut])
def read_personas(db: Session = Depends(get_db)):
    return db.query(Persona).all()

@app.get("/personas/{persona_id}", response_model=PersonaOut)
def read_persona(persona_id: int, db: Session = Depends(get_db)):
    db_persona = db.query(Persona).filter(Persona.id == persona_id).first()
    if db_persona is None:
        raise HTTPException(status_code=404, detail="Persona not found")
    return db_persona

@app.put("/personas/{persona_id}", response_model=PersonaOut)
def update_persona(persona_id: int, persona: PersonaUpdate, db: Session = Depends(get_db)):
    db_persona = db.query(Persona).filter(Persona.id == persona_id).first()
    if db_persona is None:
        raise HTTPException(status_code=404, detail="Persona not found")
    for key, value in persona.dict().items():
        setattr(db_persona, key, value)
    db.commit()
    db.refresh(db_persona)
    return db_persona

@app.delete("/personas/{persona_id}", response_model=PersonaOut)
def delete_persona(persona_id: int, db: Session = Depends(get_db)):
    db_persona = db.query(Persona).filter(Persona.id == persona_id).first()
    if db_persona is None:
        raise HTTPException(status_code=404, detail="Persona not found")
    db.delete(db_persona)
    db.commit()
    return db_persona