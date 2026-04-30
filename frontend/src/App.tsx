import { Hero } from './components/ui/animated-hero'
import ChatWidget from './components/ChatWidget'
import { Feature108 } from './components/ui/shadcnblocks-com-feature108'
import { Layout, Pointer, Zap } from "lucide-react";

const movilPlans = [
  { name: 'Aurora 50',      type: 'Prepago',  data: '1 GB',                                  duration: '7 días',   price: '$50'    },
  { name: 'Aurora 100',     type: 'Prepago',  data: '3 GB + redes sociales ilimitadas',       duration: '30 días',  price: '$100'   },
  { name: 'Aurora 200',     type: 'Prepago',  data: '8 GB + redes sociales ilimitadas',       duration: '30 días',  price: '$200'   },
  { name: 'Aurora 300',     type: 'Prepago',  data: '15 GB + redes sociales y música',        duration: '30 días',  price: '$300'   },
  { name: 'Aurora Pro 250', type: 'Pospago',  data: '10 GB + Roaming EE.UU. y Canadá',       duration: 'Mensual',  price: '$250'   },
  { name: 'Aurora Pro 450', type: 'Pospago',  data: '25 GB + 2 líneas extra al 50%',         duration: 'Mensual',  price: '$450'   },
  { name: 'Aurora Pro 750', type: 'Pospago',  data: 'Ilimitado* + Roaming + Disney+',         duration: 'Mensual',  price: '$750'   },
]

const fiberPlans = [
  { name: 'Aurora Hogar 100', speed: '100 Mbps simétrico', price: '$399' },
  { name: 'Aurora Hogar 300', speed: '300 Mbps simétrico', price: '$599' },
  { name: 'Aurora Hogar 500', speed: '500 Mbps simétrico', price: '$799' },
  { name: 'Aurora Hogar 1G',  speed: '1 Gbps simétrico',   price: '$1,099' },
]

const coverage = [
  { city: 'Guadalajara',      zones: ['Providencia', 'Chapalita', 'Country Club', 'Americana', 'Lafayette'] },
  { city: 'Zapopan',          zones: ['Andares', 'Puerta de Hierro', 'Valle Real', 'Ciudad Granja'] },
  { city: 'Tlaquepaque',      zones: ['Centro histórico'] },
  { city: 'Ciudad de México', zones: ['Polanco', 'Condesa', 'Roma Norte', 'Del Valle', 'Coyoacán'] },
  { city: 'Monterrey',        zones: ['San Pedro Garza García', 'Valle Oriente', 'Cumbres'] },
]

const faq = [
  {
    q: '¿Puedo conservar mi número actual?',
    a: 'Sí. La portabilidad es gratuita y tarda entre 24 y 72 horas. Solo necesitas tu NIP de portabilidad (márcalo con 051 desde tu línea actual) y una identificación oficial.'
  },
  {
    q: '¿Los planes incluyen roaming internacional?',
    a: 'Los planes pospago Aurora Pro 250, 450 y 750 incluyen roaming sin costo en EE. UU. y Canadá. Para otros países, contrata un paquete adicional por WhatsApp.'
  },
  {
    q: '¿Aurora Telecom ofrece eSIM?',
    a: 'Sí. Todos los planes pospago soportan eSIM en dispositivos compatibles. Los planes prepago se ofrecen con SIM física por el momento.'
  },
  {
    q: '¿Hay descuentos para estudiantes o adultos mayores?',
    a: 'Sí. Adultos mayores de 60 años y estudiantes con credencial vigente reciben 15% de descuento permanente en cualquier plan pospago.'
  },
  {
    q: '¿Puedo compartir mis datos por hotspot?',
    a: 'Sí, todos los planes permiten compartir datos por hotspot sin costo adicional ni restricciones, hasta agotar el paquete contratado.'
  },
  {
    q: '¿Puedo agregar más líneas a mi cuenta?',
    a: 'Sí. Agrega hasta 4 líneas adicionales con descuentos progresivos: 20% en la 2ª, 30% en la 3ª y 40% en la 4ª y 5ª línea.'
  },
]

const paymentMethods = [
  'Tarjeta Visa, Mastercard y American Express',
  'Transferencia SPEI',
  'Efectivo en OXXO, 7-Eleven, Walmart y Soriana',
  'Domiciliación bancaria',
  'Cajeros BBVA, Banorte y Santander',
  'PayPal (recargas prepago)',
]

const C = {
  bg:     '#F8F8F6',
  white:  '#FFFFFF',
  ink:    '#1A1A1A',
  muted:  '#6B6B6B',
  border: '#E5E5E5',
  brand:  '#1B6FE8',
} as const

function openChat() {
  document.querySelector<HTMLButtonElement>('[data-chat-trigger]')?.click()
}

export default function App() {
  return (
    <div className="min-h-screen bg-white text-ink font-sans" style={{
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    }}>

      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#E5E5E5]">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6 md:px-8 h-[56px] flex items-center justify-between">
          <span className="text-[15px] font-semibold tracking-tight text-ink">Aurora Telecom</span>
          <nav className="hidden md:flex items-center gap-6 md:gap-10 text-[13px]">
            {[['#planes', 'Planes'], ['#internet', 'Internet'], ['#cobertura', 'Cobertura'], ['#faq', 'Preguntas'], ['#contacto', 'Contacto']].map(([href, label]) => (
              <a key={href} href={href} className="transition-colors text-muted hover:text-ink">
                {label}
              </a>
            ))}
          </nav>
          {/* Mobile menu placeholder (future: add hamburger) */}
        </div>
      </header>

      {/* HERO */}
      <div style={{ backgroundColor: C.white, borderBottom: `1px solid ${C.border}` }}>
        <Hero onOpenChat={openChat} />
      </div>


      {/* VENTAJAS — Feature108 Aurora adaptado */}
      <Feature108
        badge="Aurora Telecom"
        heading="Por qué elegir Aurora"
        description="Cobertura nacional, sin contratos forzosos, soporte 24/7 y beneficios reales para todos."
        tabs={[
          {
            value: "tab-1",
            icon: <Zap className="h-auto w-4 shrink-0 text-blue-600" />,
            label: "Libertad total",
            content: {
              badge: "Sin contratos",
              title: "Cancela cuando quieras, sin penalización",
              description: "La permanencia no existe en Aurora. Portabilidad gratuita y planes flexibles para que elijas lo que necesitas.",
              buttonText: "Ver planes",
              imageSrc: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
              imageAlt: "Teléfono móvil en mano",
            },
          },
          {
            value: "tab-2",
            icon: <Pointer className="h-auto w-4 shrink-0 text-blue-600" />,
            label: "Beneficios reales",
            content: {
              badge: "Cobertura y soporte",
              title: "Cobertura nacional y soporte 24/7",
              description: "Operamos sobre la red de un operador nacional. Soporte técnico humano y asistente IA siempre disponibles.",
              buttonText: "Soporte técnico",
              imageSrc: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
              imageAlt: "Mapa de cobertura de red",
            },
          },
          {
            value: "tab-3",
            icon: <Layout className="h-auto w-4 shrink-0 text-blue-600" />,
            label: "Tecnología avanzada",
            content: {
              badge: "eSIM y WiFi 6",
              title: "eSIM, WiFi 6 y más",
              description: "Planes pospago con eSIM, modem WiFi 6 en fibra y protección Aurora Shield incluidos sin costo extra.",
              buttonText: "Ver detalles",
              imageSrc: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
              imageAlt: "Tecnología de internet y dispositivos",
            },
          },
        ]}
      />

      <div style={{ borderTop: `1px solid ${C.border}` }} />


      {/* PLANES MÓVILES */}
      <section className="max-w-[1120px] mx-auto px-4 sm:px-6 md:px-8 py-10 md:py-20" id="planes">
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 md:gap-16">
          <div className="pt-1">
            <h2 className="text-[20px] font-semibold leading-tight mb-3" style={{ color: C.brand }}>Planes móviles</h2>
            <p className="text-[13px] leading-relaxed" style={{ color: C.muted }}>
              Llamadas y SMS ilimitados a México, EE. UU. y Canadá en todos los planes. Precios con IVA incluido.
            </p>
            <p className="text-[12px] mt-4 leading-relaxed" style={{ color: C.muted }}>
              Redes sociales ilimitadas incluyen WhatsApp, Facebook, Instagram, X y TikTok.
            </p>
          </div>
          <div>
            <div className="overflow-x-auto rounded-2xl overflow-hidden border" style={{ borderColor: C.border }}>
              <table className="w-full text-[13px] min-w-[480px] sm:min-w-[600px]">
                <thead>
                  <tr style={{ backgroundColor: C.brand }}>
                    {[
                      { label: 'Plan',           right: false, hide: '' },
                      { label: 'Tipo',           right: false, hide: '' },
                      { label: 'Datos incluidos',right: false, hide: 'hidden sm:table-cell' },
                      { label: 'Vigencia',       right: false, hide: 'hidden md:table-cell' },
                      { label: 'Precio MXN',     right: true,  hide: '' },
                    ].map(h => (
                      <th key={h.label}
                        className={`py-3.5 px-4 text-[11px] uppercase tracking-[0.1em] font-semibold ${h.right ? 'text-right' : 'text-left'} ${h.hide}`}
                        style={{ color: '#FFFFFF' }}>
                        {h.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {movilPlans.map((p, i) => (
                    <tr key={p.name}
                      className="transition-colors hover:bg-blue-50/40"
                      style={i < movilPlans.length - 1 ? { borderBottom: `1px solid ${C.border}` } : {}}>
                      <td className="py-4 px-4 font-semibold" style={{ color: C.ink }}>{p.name}</td>
                      <td className="py-4 px-4">
                        <span style={{
                          display: 'inline-block', fontSize: '11px', fontWeight: 500,
                          padding: '2px 9px', borderRadius: '999px',
                          backgroundColor: p.type === 'Prepago' ? '#F3F4F6' : '#EFF6FF',
                          color: p.type === 'Prepago' ? '#4B5563' : C.brand,
                        }}>{p.type}</span>
                      </td>
                      <td className="py-4 px-4 hidden sm:table-cell" style={{ color: C.muted }}>{p.data}</td>
                      <td className="py-4 px-4 hidden md:table-cell" style={{ color: C.muted }}>{p.duration}</td>
                      <td className="py-4 px-4 text-right font-bold tabular-nums text-[14px]" style={{ color: C.brand }}>{p.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[11px] mt-3" style={{ color: C.muted }}>
              * Aurora Pro 750: después de 80 GB consumidos la velocidad se reduce a 1 Mbps por el resto del mes.
            </p>
          </div>
        </div>
      </section>

      <div style={{ borderTop: `1px solid ${C.border}` }} />


      {/* INTERNET DE FIBRA */}
      <section className="max-w-[1120px] mx-auto px-4 sm:px-6 md:px-8 py-10 md:py-20" id="internet">
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 md:gap-16">
          <div className="pt-1">
            <h2 className="text-[20px] font-semibold leading-tight mb-3" style={{ color: C.brand }}>Internet de fibra</h2>
            <p className="text-[13px] leading-relaxed" style={{ color: C.muted }}>
              Velocidades simétricas. Sin límite de datos. Modem WiFi 6 incluido en comodato.
            </p>
            <p className="text-[12px] mt-4" style={{ color: C.muted }}>
              Instalación gratuita contratando en línea o por WhatsApp. $499 MXN en tienda.
            </p>
            <p className="text-[12px] mt-2" style={{ color: C.muted }}>
              Tiempo de instalación: 3 a 7 días hábiles. Lun–Sáb 9:00–18:00.
            </p>
          </div>
          <div>
            <div className="overflow-x-auto rounded-2xl overflow-hidden border" style={{ borderColor: C.border }}>
              <table className="w-full text-[13px] min-w-[320px] sm:min-w-[400px]">
                <thead>
                  <tr style={{ backgroundColor: C.brand }}>
                    <th className="text-left py-3.5 px-4 text-[11px] uppercase tracking-[0.1em] font-semibold" style={{ color: '#FFFFFF' }}>Plan</th>
                    <th className="text-left py-3.5 px-4 text-[11px] uppercase tracking-[0.1em] font-semibold" style={{ color: '#FFFFFF' }}>Velocidad</th>
                    <th className="text-right py-3.5 px-4 text-[11px] uppercase tracking-[0.1em] font-semibold" style={{ color: '#FFFFFF' }}>Precio MXN / mes</th>
                  </tr>
                </thead>
                <tbody>
                  {fiberPlans.map((p, i) => (
                    <tr key={p.name}
                      className="transition-colors hover:bg-blue-50/40"
                      style={i < fiberPlans.length - 1 ? { borderBottom: `1px solid ${C.border}` } : {}}>
                      <td className="py-4 px-4 font-semibold" style={{ color: C.ink }}>{p.name}</td>
                      <td className="py-4 px-4" style={{ color: C.muted }}>{p.speed}</td>
                      <td className="py-4 px-4 text-right font-bold tabular-nums text-[14px]" style={{ color: C.brand }}>{p.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[12px] mt-6 leading-relaxed" style={{ color: C.muted }}>
              Al cancelar, devuelve el modem en cualquier tienda Aurora o agenda recolección gratuita. Si no se devuelve, se aplica cargo de $1,500 MXN.
            </p>
          </div>
        </div>
      </section>

      <div style={{ borderTop: `1px solid ${C.border}` }} />

      {/* COBERTURA DE FIBRA */}
      <section className="max-w-[1120px] mx-auto px-4 sm:px-6 md:px-8 py-10 md:py-20" id="cobertura" style={{ backgroundColor: C.white }}>
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 md:gap-16">
          <div className="pt-1">
            <h2 className="text-[20px] font-semibold leading-tight mb-3" style={{ color: C.brand }}>Cobertura de fibra</h2>
            <p className="text-[13px] leading-relaxed" style={{ color: C.muted }}>
              Telefonía móvil con cobertura nacional. Fibra óptica residencial en zonas seleccionadas.
            </p>
            <p className="text-[12px] mt-4" style={{ color: C.muted }}>
              Verifica tu domicilio en auroratelecom.mx/cobertura o llama al 33-1234-5678.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
            {coverage.map(c => (
              <div key={c.city}>
                <p className="text-[13px] font-semibold mb-2" style={{ color: C.ink }}>{c.city}</p>
                <ul className="space-y-1.5">
                  {c.zones.map(z => (
                    <li key={z} className="text-[12px]" style={{ color: C.muted }}>{z}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ borderTop: `1px solid ${C.border}` }} />

      {/* FORMAS DE PAGO */}
      <section className="max-w-[1120px] mx-auto px-4 sm:px-6 md:px-8 py-10 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 md:gap-16">
          <div className="pt-1">
            <h2 className="text-[20px] font-semibold leading-tight mb-3" style={{ color: C.brand }}>Formas de pago</h2>
            <p className="text-[13px] leading-relaxed" style={{ color: C.muted }}>
              Facturación electrónica CFDI 4.0. Solicítala en auroratelecom.mx/facturacion dentro del mes en curso.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
            {paymentMethods.map(m => (
              <div key={m} className="flex items-center gap-3 py-2" style={{ borderBottom: `1px solid ${C.border}` }}>
                <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: C.brand }} />
                <span className="text-[13px]" style={{ color: C.ink }}>{m}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ borderTop: `1px solid ${C.border}` }} />

      {/* SOPORTE */}
      <section className="max-w-[1120px] mx-auto px-4 sm:px-6 md:px-8 py-10 md:py-20" style={{ backgroundColor: C.white }}>
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 md:gap-16">
          <div className="pt-1">
            <h2 className="text-[20px] font-semibold leading-tight mb-3" style={{ color: C.brand }}>Soporte técnico</h2>
            <p className="text-[13px] leading-relaxed" style={{ color: C.muted }}>
              Mantenimiento preventivo los primeros martes de cada mes entre 2:00 y 5:00 AM.
            </p>
          </div>
          <div>
            <div className="overflow-x-auto rounded-2xl overflow-hidden" style={{ border: `1px solid ${C.border}` }}>
            <table className="w-full text-[13px]">
              <thead>
                <tr style={{ backgroundColor: C.brand }}>
                  <th className="text-left py-3.5 px-4 text-[11px] uppercase tracking-[0.1em] font-semibold" style={{ color: '#FFFFFF' }}>Canal</th>
                  <th className="text-left py-3.5 px-4 text-[11px] uppercase tracking-[0.1em] font-semibold hidden sm:table-cell" style={{ color: '#FFFFFF' }}>Disponibilidad</th>
                  <th className="text-left py-3.5 px-4 text-[11px] uppercase tracking-[0.1em] font-semibold hidden md:table-cell" style={{ color: '#FFFFFF' }}>Tiempo de respuesta</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { canal: 'WhatsApp 33-9876-5432',     disp: '24/7 (IA) · Agentes 8:00–22:00', resp: '< 5 minutos'  },
                  { canal: 'Teléfono 33-1234-5678',     disp: 'Lun–Sáb 8:00–20:00',             resp: '< 10 minutos' },
                  { canal: 'soporte@auroratelecom.mx',  disp: '24/7',                            resp: '< 24 horas'  },
                  { canal: 'App Aurora (iOS y Android)', disp: '24/7',                           resp: '< 15 minutos' },
                ].map((r, i, arr) => (
                  <tr key={r.canal}
                    className="transition-colors hover:bg-blue-50/40"
                    style={i < arr.length - 1 ? { borderBottom: `1px solid ${C.border}` } : {}}>
                    <td className="py-4 px-4 font-medium" style={{ color: C.ink }}>{r.canal}</td>
                    <td className="py-4 px-4 hidden sm:table-cell" style={{ color: C.muted }}>{r.disp}</td>
                    <td className="py-4 px-4 hidden md:table-cell" style={{ color: C.muted }}>{r.resp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        </div>
      </section>

      <div style={{ borderTop: `1px solid ${C.border}` }} />

      {/* FAQ */}
      <section className="max-w-[1120px] mx-auto px-4 sm:px-6 md:px-8 py-10 md:py-20" id="faq">
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 md:gap-16">
          <div className="pt-1">
            <h2 className="text-[20px] font-semibold leading-tight mb-3" style={{ color: C.brand }}>Preguntas frecuentes</h2>
          </div>
          <div className="space-y-0">
            {faq.map(item => (
              <div key={item.q} className="py-5" style={{ borderBottom: `1px solid ${C.border}` }}>
                <p className="text-[14px] font-semibold mb-2" style={{ color: C.ink }}>{item.q}</p>
                <p className="text-[13px] leading-relaxed" style={{ color: C.muted }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ borderTop: `1px solid ${C.border}` }} />

      {/* FOOTER */}
      <footer className="max-w-[1120px] mx-auto px-4 sm:px-6 md:px-8 py-10 md:py-16" id="contacto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8 md:mb-12">
          <div>
            <p className="text-[13px] font-semibold mb-4" style={{ color: C.ink }}>Aurora Telecom</p>
            <p className="text-[12px] leading-relaxed" style={{ color: C.muted }}>
              Aurora Telecomunicaciones S.A. de C.V.<br />
              RFC: ATE180412XXX<br />
              Av. Vallarta 5000, Zapopan, Jalisco<br />
              hola@auroratelecom.mx
            </p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: C.muted }}>Contacto</p>
            <ul className="space-y-2 text-[12px]" style={{ color: C.muted }}>
              <li>33-1234-5678</li>
              <li>WhatsApp 33-9876-5432</li>
              <li>Lun–Vie 8:00–20:00 · Sáb 9:00–14:00</li>
              <li>ventas-empresas@auroratelecom.mx</li>
            </ul>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: C.muted }}>Tiendas</p>
            <ul className="space-y-2 text-[12px]" style={{ color: C.muted }}>
              <li>Plaza Andares, Zapopan</li>
              <li>Galerías Guadalajara</li>
              <li>Plaza Patria</li>
              <li>Antara Polanco, CDMX</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-t pt-6" style={{ borderColor: C.border }}>
          <p className="text-[11px]" style={{ color: C.muted }}>
            © 2024 Aurora Telecom · Consulta nuestro aviso de privacidad en auroratelecom.mx/privacidad
          </p>
          <button onClick={openChat} className="text-[12px] transition-opacity hover:opacity-70"
            style={{ color: C.brand }}>
            Hablar con soporte →
          </button>
        </div>
      </footer>

      <ChatWidget />
    </div>
  )
}
