import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { MoveRight, PhoneCall } from "lucide-react"
import { Button } from "./button"

interface AnimatedHeroProps {
  onOpenChat?: () => void
}

function Hero({ onOpenChat }: AnimatedHeroProps) {
  const [titleNumber, setTitleNumber] = useState(0)
  const titles = useMemo(
    () => [
      "sin contratos forzosos",
      "con cobertura nacional",
      "con fibra óptica en 5 ciudades",
      "con soporte 24/7",
      "para hogares y empresas"
    ],
    []
  )

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0)
      } else {
        setTitleNumber(titleNumber + 1)
      }
    }, 2000)
    return () => clearTimeout(timeoutId)
  }, [titleNumber, titles])

  return (
    <div className="w-full">
      <div className="max-w-[1120px] mx-auto px-8">
        <div className="flex flex-col items-start pt-24 pb-20">
          {/* Columna única (izquierda) */}
          <div style={{ width: '100%' }}>

            {/* Headline animado — lógica exacta del componente original */}
            <h1 className="font-bold leading-[0.92] tracking-[-2px] mb-8"
              style={{ fontSize: 'clamp(48px, 7vw, 80px)' }}>
              <span style={{ color: '#1A1A1A' }}>Conectividad</span>
              <span className="relative flex w-full overflow-hidden" style={{ height: '1.05em' }}>
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-bold"
                    style={{ color: '#1B6FE8' }}
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? { y: 0, opacity: 1 }
                        : { y: titleNumber > index ? -150 : 150, opacity: 0 }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <p className="text-[17px] leading-[1.65] max-w-[440px] mb-10" style={{ color: '#6B6B6B' }}>
              Aurora Telecom es un operador mexicano de telefonía móvil e internet residencial fundado en 2018. Ofrecemos cobertura nacional, planes flexibles sin contratos forzosos, portabilidad gratuita, internet de fibra óptica en zonas urbanas seleccionadas y soporte técnico 24/7. Consulta nuestros planes, cobertura y beneficios reales.
            </p>

            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="lg"
                className="gap-2 rounded-full text-[14px]"
                onClick={onOpenChat}
              >
                Consultar informacion y soporte
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { Hero }
