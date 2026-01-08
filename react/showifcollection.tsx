import React from 'react'
import { useProduct } from 'vtex.product-context'

const CollectionRender: React.FC = () => {
  const productContext = useProduct()
  const product = productContext?.product

  if (!product || !Array.isArray(product.productClusters)) {
    return null
  }

  const clusters = product.productClusters

  // pega apenas os IDs das coleções
  // const collectionIds = clusters.map((cluster: any) => cluster.id).join(', ')

  const has233 = clusters.some((cluster: any) => cluster.id === '233')
  const has232 = clusters.some((cluster: any) => cluster.id === '232')

  // prioridade: 233
  if (has233) {
    return (
      <div>
        <p
          style={{
            padding: '4px 10px',
            fontSize: '12px',
            color: '#999',
          }}
        >
          {/* Coleção: {collectionIds} */}
        </p>

        <img
          src="https://mfmgroup.vtexassets.com/assets/vtex.file-manager-graphql/images/f873d254-b797-4245-a3dc-53c68cce9bda___a740f1065bf10b900ded5c746a1e7fb0.gif"
          alt="Desconto de 50 reais"
          style={{ width: '100%', display: 'block' }}
        />
      </div>
    )
  }

  if (has232) {
    return (
      <div>
        <p
          style={{
            padding: '4px 10px',
            fontSize: '12px',
            color: '#999',
          }}
        >
          {/* Coleção: {collectionIds} */}
        </p>

        <img
          src="https://mfmgroup.vtexassets.com/assets/vtex.file-manager-graphql/images/71005d6d-1f6b-432a-829c-3a5e1b4ba607___280659dd259ed0dddb45fb27c8f2707f.gif"
          alt="Desconto de 3%"
          style={{ width: '100%', display: 'block' }}
        />
      </div>
    )
  }

  // fallback: não é 233 nem 232
  return (
    <div>
      <p
        style={{
          padding: '4px 10px',
          fontSize: '12px',
          color: '#999',
        }}
      >
        {/* Coleção: {collectionIds} */}
      </p>

      <p
        style={{
          padding: '10px',
          fontSize: '12px',
          color: '#696969',
        }}
      >
        À VISTA GANHE 3% DE DESCONTO
      </p>
    </div>
  )
}

export default CollectionRender
