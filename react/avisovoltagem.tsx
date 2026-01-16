import React, { useEffect, useState } from 'react'

const VoltageModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [voltage, setVoltage] = useState<'110v' | '220v' | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target) return

      const skuButton = target.closest(
        '.vtex-store-components-3-x-skuSelectorItem'
      ) as HTMLElement | null

      if (!skuButton) return

      if (
        skuButton.classList.contains(
          'vtex-store-components-3-x-skuSelectorItem--110v'
        )
      ) {
        setVoltage('110v')
        setIsOpen(true)
      }

      if (
        skuButton.classList.contains(
          'vtex-store-components-3-x-skuSelectorItem--220v'
        )
      ) {
        setVoltage('220v')
        setIsOpen(true)
      }
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  if (!isOpen || !voltage) return null

  const primeiraLinhaStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    ...(isMobile
      ? {
          flexDirection: 'column',
          marginTop: -100,
        }
      : {
          marginTop: -26,
        }),
  }

  const iconImageStyle: React.CSSProperties = {
    width: 110,
    height: 'auto',
    ...(isMobile
      ? {
          marginLeft: 0,
          position: 'relative',
          top: -16
        }
      : {
          marginLeft: -90,
          position: 'relative',
          top: 40,
        }),
  }

  const titleStyle: React.CSSProperties = {
      fontSize: 22,
      padding: 0,
      margin: 0,
      textAlign: 'center',
      ...(isMobile
        ?{
          marginBottom: 20,
        }
        :{
          marginBottom: 0,
        }
      ),
    }

  const modalStyle: React.CSSProperties = {
    display: 'flex',
    background: '#fff',
    borderRadius: 16,
    border: '4px solid #FEBBCE',
    padding: 32,
    width: '100%',
    boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
    ...(isMobile
      ? {
          maxWidth: '85vw',
        }
        : {
        maxWidth: 470,
      }),
}

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <div style={contentStyle}>
          <div style={primeiraLinhaStyle}>
            <img
              src="https://mfmgroup.vtexassets.com/assets/vtex.file-manager-graphql/images/0920a7ef-a267-447f-8244-d0f1fd1aed69___74dabe6732c66db5bf3a9643f26c10ed.png"
              alt="Aviso de voltagem"
              style={iconImageStyle}
            />

            <h2 style={titleStyle}>
              Você selecionou a seguinte voltagem do produto:
            </h2>
          </div>

          <span style={badgeStyle}>
            {voltage === '110v' ? '110V' : '220V'}
          </span>

          <p style={textStyle}>
            Ao escolher a voltagem correta, você evita danos ao equipamento e
            riscos à rede elétrica, prevenindo curtos-circuitos e outras falhas
            potenciais.
          </p>

          <p style={textStyle}>
            Atenção a essa configuração técnica garante o desempenho ideal do
            equipamento e contribui para a preservação de sua vida útil.
          </p>

          <button
            style={buttonStyle}
            onClick={() => setIsOpen(false)}
          >
            Estou ciente da voltagem
          </button>
        </div>
      </div>
    </div>
  )
}

export default VoltageModal

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0,0,0,0.55)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
}



const contentStyle: React.CSSProperties = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}



const badgeStyle: React.CSSProperties = {
  display: 'inline-block',
  padding: '6px 16px',
  borderRadius: 8,
  border: '2px solid #FEBBCE',
  fontWeight: 700,
  textAlign: 'center',
}

const textStyle: React.CSSProperties = {
  fontSize: 14,
  lineHeight: 1.5,
  color: '#444',
  marginBottom: 12,
  textAlign: 'center',
}

const buttonStyle: React.CSSProperties = {
  marginTop: 16,
  background: '#FEBBCE',
  border: 'none',
  borderRadius: 8,
  padding: '10px 20px',
  fontWeight: 600,
  cursor: 'pointer',
  color: '#fff',
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
}
