# SISTEMA DE GESTIÓN DE CITAS MÉDICAS
## Documentación Técnica Completa

---

## INTRODUCCIÓN

### Contextualización del Problema

El sistema de salud moderno enfrenta un desafío crítico: **la fragmentación de información y servicios**. Mientras que la tecnología avanza rápidamente, los pacientes aún enfrentan obstáculos significativos al intentar:

- **Gestionar múltiples citas** en diferentes clínicas sin visibilidad centralizada
- **Acceder a su historia clínica** teniendo que desplazarse de un lugar a otro
- **Coordinar atención médica** cuando necesitan consultar múltiples especialidades
- **Validar horarios** antes de confirmar nuevas citas, evitando conflictos

### Nuestro Enfoque

Esta aplicación web propone una **solución integral** que centraliza la gestión de citas y registros médicos en un único punto de acceso. Especialmente diseñada para:

- Adultos mayores que necesitan interfaces simples
- Madres gestantes con múltiples controles
- Pacientes crónicos con varias citas programadas
- Profesionales de salud coordinando agendas

---

## DESCRIPCIÓN DEL PROBLEMA

### El Caos Actual del Sistema de Salud

**Problemática Central:**
- Cada clínica opera un software de agendamiento independiente
- No existe sincronización entre sistemas
- Los pacientes tienen conflictos de horarios sin saberlo
- Acceder a registros médicos requiere múltiples desplazamientos

### Impacto en los Usuarios

1. **Frustración y Pérdida de Tiempo**: Navegar entre diferentes plataformas
2. **Riesgo Médico**: Información médica fragmentada afecta la calidad de atención
3. **Ineficiencia**: Médicos no tienen contexto completo del paciente
4. **Barreras de Acceso**: Especialmente para poblaciones vulnerables

### Nuestra Solución

Una plataforma centralizada que:
- Proporciona **visión única** de todas las citas
- Permite **acceso instantáneo** a registros médicos
- Facilita **coordinación** entre especialidades
- Ofrece **interfaces intuitivas** para todos los usuarios

---

## CONCEPTOS TÉCNICOS CLAVE

### 1. REST API con Swagger

**¿Qué es REST?**
REST (Representational State Transfer) es un estilo arquitectónico para servicios web que utiliza protocolos HTTP estándar.

**Ejemplo - Obtener citas de un usuario:**
\`\`\`bash
GET http://localhost:8000/api/appointments/user/1
\`\`\`

**Respuesta:**
\`\`\`json
[
  {
    "id": 1,
    "user_id": 1,
    "doctor_name": "Dr. García",
    "specialty": "Cardiología",
    "appointment_date": "2025-12-15T14:30:00",
    "status": "scheduled",
    "clinic": "Clínica Central"
  }
]
\`\`\`

**Swagger - Documentación Interactiva:**
\`\`\`
Acceso: http://localhost:8000/docs
Descripción: Interfaz visual para probar todos los endpoints
\`\`\`

### 2. React.js - Frontend Moderno

**¿Por qué React?**
- Componentes reutilizables
- Manejo eficiente del estado
- Actualizaciones reactivas en tiempo real
- Gran comunidad y ecosistema

**Ejemplo - Componente de Cita:**
\`\`\`jsx
function AppointmentCard({ appointment }) {
  return (
    <Card>
      <CardTitle>{appointment.doctor_name}</CardTitle>
      <CardContent>
        <p>Fecha: {format(appointment.appointment_date)}</p>
        <Button onClick={() => cancelAppointment(appointment.id)}>
          Cancelar
        </Button>
      </CardContent>
    </Card>
  )
}
\`\`\`

### 3. Hooks - Gestión de Estado en React

**useAuth - Gestión de Autenticación:**
\`\`\`jsx
const { user, login, logout } = useAuth()

// Usar en componentes:
const handleLogin = async (email, password) => {
  await login(email, password)
}
\`\`\`

**useState - Estado Local:**
\`\`\`jsx
const [appointments, setAppointments] = useState([])

// Actualizar estado:
setAppointments([...appointments, newAppointment])
\`\`\`

**useEffect - Efectos Secundarios:**
\`\`\`jsx
useEffect(() => {
  // Cargar citas cuando el componente monta
  loadAppointments()
}, [userId])
\`\`\`

**useReducer - Estado Complejo:**
\`\`\`jsx
const [state, dispatch] = useReducer(appointmentReducer, initialState)

// Acciones:
dispatch({ type: 'ADD_APPOINTMENT', payload: newAppointment })
\`\`\`

### 4. Context API - Gestión Global de Estado

**Definir Contexto:**
\`\`\`jsx
export const AppointmentContext = createContext()

export function AppointmentProvider({ children }) {
  const [appointments, setAppointments] = useState([])

  return (
    <AppointmentContext.Provider value={{ appointments, setAppointments }}>
      {children}
    </AppointmentContext.Provider>
  )
}
\`\`\`

**Usar el Contexto:**
\`\`\`jsx
function MyComponent() {
  const { appointments } = useContext(AppointmentContext)
  return <div>{appointments.length} citas</div>
}
\`\`\`

### 5. Peticiones HTTP con Axios

**Configuración:**
\`\`\`javascript
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000/api'
})
\`\`\`

**GET - Obtener datos:**
\`\`\`javascript
const getAppointments = async (userId) => {
  const response = await api.get(`/appointments/user/${userId}`)
  return response.data
}
\`\`\`

**POST - Crear datos:**
\`\`\`javascript
const createAppointment = async (appointmentData) => {
  const response = await api.post('/appointments', appointmentData)
  return response.data
}
\`\`\`

**PUT - Actualizar datos:**
\`\`\`javascript
const cancelAppointment = async (appointmentId) => {
  const response = await api.put(`/appointments/${appointmentId}/cancel`)
  return response.data
}
\`\`\`

### 6. Rutas y Navegación

**Estructura de Rutas en Next.js:**
\`\`\`
app/
├── layout.tsx          # Layout principal
├── page.tsx            # Página de inicio (login)
├── dashboard/
│   └── page.tsx        # Dashboard (protegido)
└── api/
    └── [...].ts        # Rutas API
\`\`\`

**Navegación entre páginas:**
\`\`\`jsx
import { useRouter } from 'next/navigation'

function LoginForm() {
  const router = useRouter()
  
  const handleLogin = async () => {
    await login()
    router.push('/dashboard')
  }
}
\`\`\`

### 7. Despliegue

**Opciones de Despliegue:**

1. **Vercel (Recomendado para Frontend)**
   \`\`\`bash
   npm install -g vercel
   vercel deploy
   \`\`\`

2. **Railway o Render (Para Backend Python)**
   \`\`\`bash
   # Conectar repositorio Git
   # Variables de entorno: DATABASE_URL, SECRET_KEY
   \`\`\`

3. **Docker (Ambos Servicios)**
   \`\`\`dockerfile
   # Backend
   FROM python:3.11
   RUN pip install fastapi uvicorn sqlalchemy
   CMD ["uvicorn", "backend_app:app", "--host", "0.0.0.0"]
   \`\`\`

---

## GUÍA DE INICIO RÁPIDO

### Requisitos Previos
- Python 3.11+
- Node.js 18+
- Git

### Instalación Backend

\`\`\`bash
# 1. Crear directorio
mkdir healthcare-backend
cd healthcare-backend

# 2. Crear virtual environment
python -m venv venv
source venv/bin/activate  # En Windows: venv\\Scripts\\activate

# 3. Instalar dependencias
pip install fastapi uvicorn sqlalchemy pydantic

# 4. Crear archivo main.py con el código del backend

# 5. Ejecutar servidor
uvicorn backend_app:app --reload
\`\`\`

**Validar que funciona:**
- Swagger: http://localhost:8000/docs
- API: http://localhost:8000/api/

### Instalación Frontend

\`\`\`bash
# 1. Crear proyecto Next.js
npx create-next-app@latest healthcare-app --typescript

# 2. Instalar dependencias
npm install axios date-fns

# 3. Copiar componentes al proyecto

# 4. Ejecutar desarrollo
npm run dev
\`\`\`

**Validar que funciona:**
- App: http://localhost:3000

---

## ESTRUCTURA DEL CÓDIGO

### Backend - Capas de la Aplicación

**1. Base de Datos (models.py)**
\`\`\`python
class User(Base):
    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True)
    name = Column(String)

class Appointment(Base):
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    doctor_name = Column(String)
    appointment_date = Column(DateTime)
\`\`\`

**2. Esquemas de Validación (schemas.py)**
\`\`\`python
class AppointmentCreate(BaseModel):
    doctor_name: str
    specialty: str
    appointment_date: datetime
    clinic: str
\`\`\`

**3. Rutas API (routes.py)**
\`\`\`python
@app.get("/api/appointments/user/{user_id}")
def get_user_appointments(user_id: int):
    # Lógica aquí
    pass
\`\`\`

### Frontend - Arquitectura por Capas

**1. Páginas (app/)**
- Layout de la aplicación
- Páginas de login y dashboard

**2. Componentes (components/)**
- LoginForm: Formulario de autenticación
- AppointmentsList: Listado de citas
- MedicalRecords: Historial médico

**3. Contextos (context/)**
- AuthContext: Autenticación de usuario
- AppointmentContext: Gestión de citas

**4. Utilidades (utils/)**
- API client configuration
- Helper functions

---

## FLUJO DE DATOS

\`\`\`
Usuario
   ↓
[Login Form]
   ↓
[AuthContext - useAuth]
   ↓
[API: POST /api/users/login]
   ↓
[Backend - FastAPI]
   ↓
[Base de Datos - SQLite]
   ↓
[Respuesta JSON]
   ↓
[AuthContext actualiza estado]
   ↓
[Dashboard renderiza datos]
   ↓
[useAppointments accede a citas]
\`\`\`

---

## ENDPOINTS API

### Autenticación
- `POST /api/users/register` - Registrar usuario
- `GET /api/users/{user_id}` - Obtener datos usuario

### Citas Médicas
- `POST /api/appointments` - Crear cita
- `GET /api/appointments/user/{user_id}` - Obtener citas del usuario
- `GET /api/appointments/{appointment_id}` - Obtener cita específica
- `PUT /api/appointments/{appointment_id}/cancel` - Cancelar cita

### Registros Médicos
- `POST /api/medical-records` - Crear registro
- `GET /api/medical-records/user/{user_id}` - Obtener registros del usuario
- `GET /api/medical-records/{record_id}` - Obtener registro específico

---

## PRUEBA EN SWAGGER

1. Ir a: http://localhost:8000/docs
2. Click en "Try it out" para cada endpoint
3. Ingresar parámetros requeridos
4. Click en "Execute"

Ejemplo:
\`\`\`
POST /api/users/register
Body: {
  "email": "paciente@example.com",
  "name": "Juan Pérez",
  "password": "123456",
  "is_patient": true
}
\`\`\`

---

## PRÓXIMOS PASOS

1. **Autenticación JWT**: Reemplazar con tokens seguros
2. **Base de Datos PostgreSQL**: Escalar más allá de SQLite
3. **Tests Automatizados**: Pytest para backend, Jest para frontend
4. **Notificaciones**: Email/SMS para recordatorios de citas
5. **Mobile App**: React Native para iOS/Android
6. **Analytics**: Dashboard de uso de plataforma

---

## SOPORTE Y RECURSOS

- **FastAPI Docs**: https://fastapi.tiangolo.com/
- **React Docs**: https://react.dev/
- **Next.js Docs**: https://nextjs.org/docs
- **Axios Docs**: https://axios-http.com/
\`\`\`

He creado tu aplicación completa de gestión de citas médicas con backend en Python (FastAPI) y frontend en React (Next.js). El backend incluye una API REST con Swagger integrado, modelos de base de datos SQLite y todos los endpoints necesarios. El frontend utiliza Context API para gestión de estado global, Hooks para lógica reactiva y Axios para comunicación con la API. La documentación técnica incluye explicaciones detalladas de cada concepto (REST, React, Hooks, Context, Axios, rutas y despliegue) con ejemplos prácticos.
