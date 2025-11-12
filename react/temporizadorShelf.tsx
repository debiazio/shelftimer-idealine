import React, { useEffect, useState } from 'react'
import styles from './shelfTimer.css'

type PropsShelfTimer = {
  message: string
  duration: number
}

function ShelfTimer({ message, duration }: PropsShelfTimer) {
  const startTime = new Date(message)
  const durationMs = duration * 1000

  const [timeLeft, setTimeLeft] = useState<number | null>(null)
  const [isActive, setIsActive] = useState(false)

  // Atualiza tempo e estado a cada segundo
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const start = startTime.getTime()
      const end = start + durationMs

      if (now < start) {
        setIsActive(false)
        setTimeLeft(start - now)
      } else if (now >= start && now <= end) {
        setIsActive(true)
        setTimeLeft(end - now)
      } else {
        setIsActive(false)
        setTimeLeft(0)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [message, duration])

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000)
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0')
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0')
    const seconds = String(totalSeconds % 60).padStart(2, '0')
    return { hours, minutes, seconds }
  }

  // 🧠 Mostra ou esconde a prateleira quando o estado muda
  useEffect(() => {
    const handleShelfVisibility = () => {
      const shelf = document.querySelector(
        '.vtex-flex-layout-0-x-flexRow--linha-shelf-timer'
      ) as HTMLElement | null
      if (shelf) {
        shelf.style.display = isActive ? 'flex' : 'none'
      }
    }

    handleShelfVisibility()

    // 🧩 Caso a prateleira ainda não exista no DOM, observamos mudanças
    const observer = new MutationObserver(() => handleShelfVisibility())
    observer.observe(document.body, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [isActive])

  const formatted = timeLeft ? formatTime(timeLeft) : { hours: '00', minutes: '00', seconds: '00' }

  return (
    <div className={styles.timerContainer}>
      {timeLeft !== null && (
        <div className={styles.timerBox}>
          <div className={styles.timeGroup}>
            {formatted.hours.split('').map((digit, i) => (
              <span key={`h-${i}`} className={styles.digit}>{digit}</span>
            ))}
            <span className={styles.separator}>:</span>
            {formatted.minutes.split('').map((digit, i) => (
              <span key={`m-${i}`} className={styles.digit}>{digit}</span>
            ))}
            <span className={styles.separator}>:</span>
            {formatted.seconds.split('').map((digit, i) => (
              <span key={`s-${i}`} className={styles.digit}>{digit}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

ShelfTimer.schema = {
  title: 'Agendamento do Temporizador da Prateleira',
  description: 'Define a data de início e o tempo de exibição da prateleira',
  type: 'object',
  properties: {
    message: {
      title: 'Data e hora de início',
      description: 'Selecione o momento em que a prateleira ficará visível',
      type: 'string',
      format: 'date-time',
      default: null,
    },
    duration: {
      title: 'Duração (em segundos)',
      description: 'Tempo total que a prateleira ficará visível após iniciar',
      type: 'number',
      default: 3600,
    },
  },
}

export default ShelfTimer
