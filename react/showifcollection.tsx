import React from 'react'
import { useProduct } from 'vtex.product-context'

const CollectionRender: React.FC = () => {
  const productContext = useProduct()
  const product = productContext?.product

  if (!product || !Array.isArray(product.productClusters)) {
    return null
  }

  const clusters = product.productClusters

  const has233 = clusters.some((cluster: any) => cluster.id === '233')
  const has232 = clusters.some((cluster: any) => cluster.id === '232')

  // prioridade: 233
  if (has233) {
    return (
      <div>
        <img
          src="https://mfmgroup.vtexassets.com/assets/vtex.file-manager-graphql/images/f873d254-b797-4245-a3dc-53c68cce9bda___a740f1065bf10b900ded5c746a1e7fb0.gif"
          alt="Desconto de 50 reais"
          style={{ maxWidth: '100%', display: 'block' }}
        />
      </div>
    )
  }

  if (has232) {
    return (
      <div>
        <p
        style={{ padding: '10px'}}>À VISTA GANHE 3% DE DESCONTO</p>
      </div>
    )
  }

  // fallback: não é 233 nem 232
  return (
    <div>
              <p
        style={{ padding: '10px'}}>À VISTA GANHE 3% DE DESCONTO</p>
    </div>
  )
}

export default CollectionRender
