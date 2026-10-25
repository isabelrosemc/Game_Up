import FormField from './FormField'
import { COMUNAS_POR_REGION, regiones } from '../data/regiones'

// Dos selects dependientes: al elegir una región, la lista de comunas se llena con las de esa región.
// `onChange(campo, valor)` avisa a la página qué campo cambió.
export default function RegionComuna({ region, comuna, onChange }) {
  const comunas = COMUNAS_POR_REGION[region] || []

  const cambiarRegion = (evento) => {
    onChange('region', evento.target.value)
    onChange('comuna', '') // al cambiar de región se borra la comuna elegida
  }

  return (
    <>
      <FormField
        id="region"
        label="Región"
        obligatorio
        as="select"
        value={region}
        onChange={cambiarRegion}
      >
        <option value="" disabled>Seleccione una región</option>
        {regiones.map((nombre) => (
          <option key={nombre} value={nombre}>{nombre}</option>
        ))}
      </FormField>

      <FormField
        id="comuna"
        label="Comuna"
        obligatorio
        as="select"
        value={comuna}
        disabled={comunas.length === 0}
        onChange={(evento) => onChange('comuna', evento.target.value)}
      >
        <option value="" disabled>
          {comunas.length === 0 ? 'Selecciona tu región primero' : 'Seleccione una comuna'}
        </option>
        {comunas.map((nombre) => (
          <option key={nombre} value={nombre}>{nombre}</option>
        ))}
      </FormField>
    </>
  )
}