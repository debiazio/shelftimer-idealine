import { useEffect } from 'react'

const TRIGGER_SELECTOR =
  'button.vtex-disclosure-layout-1-x-trigger'

const DisclosureCategorias = () => {
  useEffect(() => {
    let tries = 0
    const MAX_TRIES = 40 // ~4 segundos

    const ensureOneOpen = () => {
      const triggers = Array.from(
        document.querySelectorAll<HTMLButtonElement>(TRIGGER_SELECTOR)
      )

      if (!triggers.length) return false

      const hasOpen = triggers.some(
        trigger => trigger.getAttribute('aria-expanded') === 'true'
      )

      if (!hasOpen) {
        triggers[0].click()
      }

      return true
    }

    // 🔑 espera o disclosure existir no DOM
    const interval = setInterval(() => {
      tries++

      const ready = ensureOneOpen()

      if (ready || tries >= MAX_TRIES) {
        clearInterval(interval)
      }
    }, 100)

    // 🔁 mantém sempre 1 aberto após interações
    const observer = new MutationObserver(() => {
      ensureOneOpen()
    })

    observer.observe(document.body, {
      subtree: true,
      attributes: true,
      attributeFilter: ['aria-expanded'],
    })

    return () => {
      clearInterval(interval)
      observer.disconnect()
    }
  }, [])

  return null
}

export default DisclosureCategorias
