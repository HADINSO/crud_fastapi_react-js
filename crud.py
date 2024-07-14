from sqlalchemy.orm import Session
import models, schemas

def get_persona(db: Session, persona_id: int):
    return db.query(models.Persona).filter(models.Persona.id == persona_id).first()

def get_personas(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Persona).offset(skip).limit(limit).all()

def create_persona(db: Session, persona: schemas.PersonaCreate):
    db_persona = models.Persona(nombre=persona.nombre, apellido=persona.apellido)
    db.add(db_persona)
    db.commit()
    db.refresh(db_persona)
    return db_persona

def update_persona(db: Session, persona_id: int, persona: schemas.PersonaCreate):
    db_persona = db.query(models.Persona).filter(models.Persona.id == persona_id).first()
    db_persona.nombre = persona.nombre
    db_persona.apellido = persona.apellido
    db.commit()
    db.refresh(db_persona)
    return db_persona

def delete_persona(db: Session, persona_id: int):
    db_persona = db.query(models.Persona).filter(models.Persona.id == persona_id).first()
    db.delete(db_persona)
    db.commit()
    return db_persona
