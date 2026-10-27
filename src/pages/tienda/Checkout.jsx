import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FormField from '../../components/FormField'
import RegionComuna from '../../components/RegionComuna'
import ResumenPedido from '../../components/ResumenPedido'
import PasosCompra from '../../components/PasosCompra'
import { useAuth } from '../../context/AuthContext'
import { useCarrito } from '../../context/CarritoContext'
import { opcionesEntrega } from '../../data/entregas'
import { formatearPrecio } from '../../utils/formato'
import { confirmarPedido, procesarPago } from '../../utils/pedidos'
import { calcularDescuento } from '../../utils/precios'
import { revisarCompra } from '../../utils/productos'
import { validarDatosCheckout, validarTarjeta } from '../../utils/validacionesCheckout'

const METODOS_PAGO = [
  { id: 'webpay', icono: '💳', nombre: 'Webpay' },
  { id: 'tarjeta', icono: '🏦', nombre: 'Tarjeta crédito/débito' },
  { id: 'puntos', icono: '⭐', nombre: 'Puntos LevelUp' },
]

export default function Checkout() {
  const navegar = useNavigate()
  const { usuario } = useAuth()
  const { carrito, subtotal, cantidadTotal, vaciar, sincronizar } = useCarrito()

  // Si hay un usuario con sesión, sus datos aparecen ya escritos en el formulario
  const [valores, setValores] = useState({
    nombre: usuario?.nombre ?? '',
    apellidos: usuario?.apellidos ?? '',
    correo: usuario?.correo ?? '',
    telefono: '',
    region: usuario?.region ?? '',
    comuna: usuario?.comuna ?? '',
    direccion: usuario?.direccion ?? '',
  })
  const [entrega, setEntrega] = useState(opcionesEntrega[0].id)
  const [metodoPago, setMetodoPago] = useState('webpay')
  const [tarjeta, setTarjeta] = useState({ numero: '', vencimiento: '', cvv: '' })
  const [acepta, setAcepta] = useState(false)
  const [procesando, setProcesando] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => { sincronizar() }, [sincronizar]) // Comprueba las existencias y precios al abrir Checkout

  const cambiarCampo = (campo, valor) => setValores((previos) => ({ ...previos, [campo]: valor }))
  const manejarCambio = (evento) => cambiarCampo(evento.target.name, evento.target.value)
  const manejarCambioTarjeta = (evento) => {
    const { name, value } = evento.target
    setTarjeta((previos) => ({ ...previos, [name]: value }))
  }

  // Cálculos del resumen
  const opcionEntrega = opcionesEntrega.find((opcion) => opcion.id === entrega)
  // Se usa el correo validado del formulario, el mismo que quedará en el pedido.
  const descuento = calcularDescuento(subtotal, valores.correo)

  const manejarEnvio = async (evento) => {
    evento.preventDefault()
    if (procesando) return
    setError('')

    const errorDatos = validarDatosCheckout(valores)
    if (errorDatos) { setError(errorDatos); return }
    if (metodoPago === 'tarjeta') {
      const errorTarjeta = validarTarjeta(tarjeta)
      if (errorTarjeta) { setError(errorTarjeta); return }
    }
    if (!acepta) { setError('Debes aceptar los términos y condiciones.'); return }

    const revision = revisarCompra(carrito)
    if (revision.error) {
      setError(`${revision.error} Revisa tu carrito antes de pagar.`)
      sincronizar()
      return
    }
    if (revision.subtotal !== subtotal) {
      setError('Los precios cambiaron. Revisa el resumen antes de volver a pagar.')
      sincronizar()
      return
    }

    setProcesando(true)

    try {
      // La pasarela es simulada; la tarjeta nunca se guarda en el pedido.
      const resultado = await procesarPago({ metodoPago, tarjeta: metodoPago === 'tarjeta' ? tarjeta : null })
      if (!resultado.exito) {
        navegar('/compra/fallida', { state: { motivo: resultado.motivo } })
        return
      }

      // Una última revisión evita vender unidades que se hayan agotado durante el pago.
      const revisionFinal = revisarCompra(carrito)
      if (revisionFinal.error || revisionFinal.subtotal !== revision.subtotal) {
        setError(revisionFinal.error || 'Cambió el precio de un producto. Revisa el carrito.')
        sincronizar()
        return
      }

      const resultadoPedido = await confirmarPedido(carrito, {
        id: `LU-${Date.now()}`,
        fecha: new Date().toISOString(),
        cliente: {
          nombre: valores.nombre.trim(),
          apellidos: valores.apellidos.trim(),
          correo: valores.correo.trim().toLowerCase(),
          telefono: valores.telefono.trim(),
          region: valores.region,
          comuna: valores.comuna,
          direccion: valores.direccion.trim(),
        },
        entrega: { nombre: opcionEntrega.nombre, costo: opcionEntrega.costo },
        metodoPago,
        envio: opcionEntrega.costo,
      })

      if (resultadoPedido.error) {
        setError(resultadoPedido.error)
        sincronizar()
        return
      }
      vaciar()
      navegar('/compra/exitosa')
    } catch {
      setError('No pudimos guardar el pedido. Intenta nuevamente.')
    } finally {
      setProcesando(false)
    }
  }

  if (carrito.length === 0) {
    return (
      <main className="main-container">
        <span className="section-tag">COMPRAS</span>
        <h1 className="main-section-title">Finalizar compra</h1>
        <div className="checkout-card">
          <p style={{ marginBottom: '1.5rem' }}>No tienes productos en el carrito.</p>
          <Link to="/productos" className="btn-primario">Ver productos</Link>
        </div>
      </main>
    )
  }

  return (
    <main className="main-container">
      <nav className="breadcrumb" aria-label="Ruta de navegación">
        <Link to="/">Home</Link>
        <span style={{ margin: '0 0.4rem' }}>/</span>
        <Link to="/carrito">Carrito</Link>
        <span style={{ margin: '0 0.4rem' }}>/</span>
        <span className="actual">Checkout</span>
      </nav>

      <span className="section-tag">COMPRAS</span>
      <h1 className="main-section-title">Finalizar compra</h1>

      <PasosCompra actual={2} />

      <div className="carrito-layout">
        <section aria-label="Datos de envío y pago">
          <form id="checkout-form" className="checkout-secciones" onSubmit={manejarEnvio}>
            {error && <p role="alert" className="form-mensaje error">{error}</p>}
            {/* 1. Datos del cliente y dirección */}
            <div className="checkout-card">
              <h2><span className="numero-seccion">1</span> Datos de envío</h2>

              <div className="campo-grupo">
                <FormField id="nombre" label="Nombre" obligatorio type="text" placeholder="Ej: Javiera"
                  maxLength={50} value={valores.nombre} onChange={manejarCambio} />
                <FormField id="apellidos" label="Apellidos" obligatorio type="text" placeholder="Ej: Soto Reyes"
                  maxLength={100} value={valores.apellidos} onChange={manejarCambio} />
              </div>

              <div className="campo-grupo">
                <FormField id="correo" label="Correo electrónico" obligatorio
                  ayuda="Solo @duoc.cl, @profesor.duoc.cl o @gmail.com"
                  type="email" placeholder="nombre@duoc.cl" maxLength={100}
                  value={valores.correo} onChange={manejarCambio} />
                <FormField id="telefono" label="Teléfono" type="tel" placeholder="+56 9 1234 5678"
                  value={valores.telefono} onChange={manejarCambio} />
              </div>

              <div className="campo-grupo">
                <RegionComuna region={valores.region} comuna={valores.comuna} onChange={cambiarCampo} />
              </div>

              <div className="campo-grupo una-columna">
                <FormField id="direccion" label="Dirección" obligatorio type="text"
                  placeholder="Calle, número, depto/casa" maxLength={300}
                  value={valores.direccion} onChange={manejarCambio} />
              </div>
            </div>

            {/* 2. Opciones de entrega */}
            <div className="checkout-card">
              <h2><span className="numero-seccion">2</span> Opciones de entrega</h2>
              <div className="metodos-pago-opciones">
                {opcionesEntrega.map((opcion) => (
                  <div className="metodo-pago-opcion" key={opcion.id}>
                    <input
                      type="radio"
                      id={`entrega-${opcion.id}`}
                      name="entrega"
                      checked={entrega === opcion.id}
                      onChange={() => setEntrega(opcion.id)}
                    />
                    <label htmlFor={`entrega-${opcion.id}`}>
                      <span className="icono-pago">🚚</span>
                      {opcion.nombre}
                      <small>{opcion.detalle} · {formatearPrecio(opcion.costo)}</small>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Método de pago */}
            <div className="checkout-card">
              <h2><span className="numero-seccion">3</span> Método de pago</h2>
              <div className="metodos-pago-opciones">
                {METODOS_PAGO.map((metodo) => (
                  <div className="metodo-pago-opcion" key={metodo.id}>
                    <input
                      type="radio"
                      id={`pago-${metodo.id}`}
                      name="metodo-pago"
                      checked={metodoPago === metodo.id}
                      onChange={() => setMetodoPago(metodo.id)}
                    />
                    <label htmlFor={`pago-${metodo.id}`}>
                      <span className="icono-pago">{metodo.icono}</span>
                      {metodo.nombre}
                    </label>
                  </div>
                ))}
              </div>

              {metodoPago === 'tarjeta' && (
                <div className="datos-tarjeta">
                  <div className="campo-grupo una-columna">
                    <FormField id="numero" label="Número de tarjeta" obligatorio type="text"
                      placeholder="0000 0000 0000 0000" maxLength={19}
                      value={tarjeta.numero} onChange={manejarCambioTarjeta} />
                  </div>
                  <div className="campo-grupo">
                    <FormField id="vencimiento" label="Vencimiento" obligatorio type="text"
                      placeholder="MM/AA" maxLength={5}
                      value={tarjeta.vencimiento} onChange={manejarCambioTarjeta} />
                    <FormField id="cvv" label="CVV" obligatorio type="text"
                      placeholder="123" maxLength={4}
                      value={tarjeta.cvv} onChange={manejarCambioTarjeta} />
                  </div>
                </div>
              )}

              <label className="campo-checkbox">
                <input
                  type="checkbox"
                  id="terminos"
                  name="terminos"
                  required
                  checked={acepta}
                  onChange={(evento) => setAcepta(evento.target.checked)}
                />
                <span>
                  He leído y acepto los términos y condiciones y la política de privacidad{' '}
                  <span className="obligatorio">*</span>
                </span>
              </label>
            </div>
          </form>
        </section>

        {/* Resumen del pedido */}
        <aside className="resumen-panel" aria-label="Resumen de compra">
          <h2>Resumen del pedido</h2>

          <div className="mini-lista-productos">
            {carrito.map((item) => (
              <div className="mini-item" key={item.codigo}>
                <img className="mini-item-img" style={{ objectFit: 'cover' }} src={item.imagen} alt={item.nombre} />
                <div className="mini-item-info">
                  <h4>{item.nombre}</h4>
                  <span>Cantidad: {item.cantidad}</span>
                </div>
                <div className="mini-item-precio">{formatearPrecio(item.precio * item.cantidad)}</div>
              </div>
            ))}
          </div>

          <hr className="resumen-divisor" />

          <ResumenPedido
            cantidad={cantidadTotal}
            subtotal={subtotal}
            descuento={descuento}
            envio={opcionEntrega.costo}
          />

          <button type="submit" form="checkout-form" className="btn-primario btn-pagar" disabled={procesando}>
            {procesando ? 'Procesando...' : 'Confirmar y pagar'}
          </button>

          <div className="metodos-pago">
            <span className="metodo-pago-tag">WEBPAY</span>
            <span className="metodo-pago-tag">VISA</span>
            <span className="metodo-pago-tag">MASTERCARD</span>
            <span className="metodo-pago-tag">PUNTOS LEVELUP</span>
          </div>
        </aside>
      </div>
    </main>
  )
}