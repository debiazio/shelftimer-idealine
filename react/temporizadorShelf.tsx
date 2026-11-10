import React, { useEffect, useState } from 'react'
import styles from './shelfTimer.css'

type PropsShelfTimer = {
  startDateTime: string
  endDateTime: string
}

function ShelfTimer({ startDateTime, endDateTime }: PropsShelfTimer) {
  const [timeLeft, setTimeLeft] = useState<number | null>(null)
  const [isActive, setIsActive] = useState(false)

  // Calcula a contagem regressiva usando os horários de início e fim
  useEffect(() => {
    const start = new Date(startDateTime).getTime()
    const end = new Date(endDateTime).getTime()

    const updateTimer = () => {
      const now = Date.now()

      // Datas inválidas ou fim anterior/igual ao início
      if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start) {
        setIsActive(false)
        setTimeLeft(null)
        return
      }

      if (now < start) {
        setIsActive(false)
        setTimeLeft(start - now)
      } else if (now < end) {
        setIsActive(true)
        setTimeLeft(end - now)
      } else {
        setIsActive(false)
        setTimeLeft(0)
      }
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)

    return () => clearInterval(interval)
  }, [startDateTime, endDateTime])

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000)
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0')
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0')
    const seconds = String(totalSeconds % 60).padStart(2, '0')

    return { hours, minutes, seconds }
  }

  // Mostra ou esconde a prateleira quando o estado muda
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

    // Caso a prateleira ainda não exista no DOM, observa mudanças
    const observer = new MutationObserver(() => handleShelfVisibility())
    observer.observe(document.body, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [isActive])

  const formatted =
    timeLeft !== null
      ? formatTime(timeLeft)
      : { hours: '00', minutes: '00', seconds: '00' }

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
  description: 'Define os horários de início e fim da exibição da prateleira',
  type: 'object',
  properties: {
    startDateTime: {
      title: 'Data e hora de início',
      description: 'Momento em que a prateleira ficará visível',
      type: 'string',
      format: 'date-time',
      default: null,
    },
    endDateTime: {
      title: 'Data e hora finais',
      description: 'Momento em que a prateleira deixará de ficar visível',
      type: 'string',
      format: 'date-time',
      default: null,
    },
  },
}

export default ShelfTimer
