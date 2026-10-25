// Campo de formulario: etiqueta + campo + ayuda + mensaje de error (clases de formulario-simple.css).
// `as` permite usar "input" (por defecto), "textarea" o "select". El resto de props pasa directo al campo.
export default function FormField({
  id,
  label,
  obligatorio = false,
  ayuda = '',
  as: Campo = 'input',
  error = '',
  ...resto
}) {
  return (
    <div className="form-group">
      <label htmlFor={id}>
        {label}
        {obligatorio && (
          <>
            {' '}
            <span className="obligatorio">*</span>
          </>
        )}
      </label>
      <Campo
        id={id}
        name={id}
        className={error ? 'campo-invalido' : undefined}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={`error-${id}`}
        required={obligatorio}
        {...resto}
      />
      {ayuda && <span className="campo__ayuda">{ayuda}</span>}
      <span id={`error-${id}`} className="error-message">{error}</span>
    </div>
  )
}