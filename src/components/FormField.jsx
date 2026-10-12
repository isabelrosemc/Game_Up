// Campo de formulario: etiqueta + campo + mensaje de error (clases de formulario-simple.css).
export default function FormField({ id, label, as: Campo = 'input', error = '', ...resto }) {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <Campo
        id={id}
        name={id}
        className={error ? 'campo-invalido' : undefined}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={`error-${id}`}
        {...resto}
      />
      <span id={`error-${id}`} className="error-message">{error}</span>
    </div>
  )
}