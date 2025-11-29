from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="Healthcare Demo API")


class Appointment(BaseModel):
    id: int
    user_id: int
    doctor_name: str
    specialty: str
    appointment_date: str
    status: str
    clinic: str


@app.get("/ping")
def ping():
    return {"ping": "pong"}


@app.get("/api/appointments/user/{user_id}", response_model=list[Appointment])
def get_appointments(user_id: int):
    return [
        Appointment(
            id=1,
            user_id=user_id,
            doctor_name="Dr. García",
            specialty="Cardiología",
            appointment_date="2025-12-15T14:30:00",
            status="scheduled",
            clinic="Clínica Central",
        )
    ]
