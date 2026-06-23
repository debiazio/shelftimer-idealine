import React, { useContext } from 'react'
import { ProductContext } from 'vtex.product-context'

const DiscountPixPrice = () => {
  const productContextValue = useContext(ProductContext)

  const sellers = productContextValue?.product?.items?.[0]?.sellers
  const commertialOffer = sellers?.[0]?.commertialOffer
  const pixPrice = commertialOffer?.Price

  if (!pixPrice) return null

  const discountPrice = (pixPrice * 0.9).toFixed(2)

  // Formata para o padrão brasileiro: 1.799,99
  const formatted = Number(discountPrice).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  return (
    <div>
      <span style={{
        color: '#FC58BA',
        fontSize: '2.5rem',
        fontWeight: 'bold',
      }}>
        R$ {formatted}
      </span>
    </div>
  )
}

export default DiscountPixPrice
