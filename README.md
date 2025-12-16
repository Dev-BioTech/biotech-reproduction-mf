# 🐣 BioTech Reproduction - Gestión Reproductiva

Módulo de control y seguimiento de reproducción animal.

## 🚀 Características

- **Ciclos reproductivos**: Control de celo e inseminación
- **Seguimiento de gestación**: Monitoreo de preñez
- **Registro de partos**: Historial de nacimientos
- **Genealogía**: Árbol familiar
- **Planificación**: Calendario reproductivo
- **Estadísticas**: KPIs reproductivos
- **Alertas**: Eventos importantes

## 🛠️ Tecnologías

- React 18
- Vite + Module Federation
- React Hook Form + Yup
- Axios
- Zustand
- Tailwind CSS

## 📦 Instalación

```bash
npm install
npm run dev  # Puerto 5005
```

## 🔌 Componentes Expuestos

```javascript
// Ciclos reproductivos
import('reproductionMF/ReproductionCycles')

// Seguimiento de preñez
import('reproductionMF/PregnancyTracking')

// Registro de partos
import('reproductionMF/BirthRegistry')

// Store
import('reproductionMF/ReproductionStore')
```

## 📁 Estructura

```
src/
├── features/
│   ├── reproduction-cycles/
│   │   ├── components/
│   │   │   └── ReproductionCycles.jsx
│   │   ├── hooks/
│   │   └── services/
│   ├── pregnancy-tracking/
│   │   ├── components/
│   │   └── services/
│   └── birth-registry/
│       ├── components/
│       ├── validations/
│       └── services/
├── shared/
│   ├── store/
│   │   └── reproductionStore.js
│   ├── constants/
│   │   └── reproductionConstants.js
│   └── utils/
└── App.jsx
```

## 💕 Estados Reproductivos

```javascript
export const REPRODUCTION_STATUS = {
  HEAT: 'En Celo',
  INSEMINATED: 'Inseminada',
  PREGNANT: 'Preñada',
  CALVING: 'En Parto',
  POSTPARTUM: 'Postparto',
  OPEN: 'Vacía'
}
```

## 🧬 Métodos de Inseminación

```javascript
export const INSEMINATION_METHODS = {
  NATURAL: 'Monta Natural',
  ARTIFICIAL: 'Inseminación Artificial',
  EMBRYO_TRANSFER: 'Transferencia de Embriones'
}
```

## 🌍 API Endpoints

```javascript
GET    /api/reproduction/cycles        // Ciclos
POST   /api/reproduction/cycles        // Registrar ciclo
GET    /api/reproduction/pregnancies   // Gestaciones
POST   /api/reproduction/pregnancies   // Nueva gestación
GET    /api/reproduction/births        // Partos
POST   /api/reproduction/births        // Registrar parto
GET    /api/reproduction/stats         // Estadísticas
```

## 🤰 Control de Gestación

```typescript
interface Pregnancy {
  id: number
  animalId: number
  inseminationDate: Date
  expectedBirthDate: Date
  daysPregnant: number
  stage: 'Primer Trimestre' | 'Segundo Trimestre' | 'Tercer Trimestre'
  inseminationMethod: string
  bullId?: number
  ultrasound: [
    {
      date: Date
      result: string
      veterinarian: string
    }
  ]
  status: string
}
```

## 📊 KPIs Reproductivos

- Tasa de concepción
- Tasa de preñez
- Intervalo entre partos
- Días vacíos promedio
- Tasa de natalidad
- Tasa de mortalidad neonatal

## 📅 Eventos Programados

- Detección de celo (21 días)
- Confirmación de preñez (30-45 días)
- Ultrasonidos (60, 90, 120 días)
- Preparación para parto (7 días antes)
- Secado (60 días antes del parto)

## 🔔 Alertas

```javascript
// Notificaciones
- Próximo celo estimado
- Confirmación de preñez pendiente
- Parto próximo (7 días)
- Revisión post-parto (15 días)
```

## 🚀 Deploy

```bash
npm run build
vercel --prod
```

## 📞 Contacto

- Email: reproduction@biotech.com
- Docs: https://docs.biotech.com/reproduction
```