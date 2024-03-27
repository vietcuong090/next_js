import { Container } from '@mui/material'
import { ProductDetails } from './ProductDetails.1'
import { product } from '@/utils/product'
import ListRating from './ListRating'

interface IPrams {
  productID?: string
}

const Product = ({ params }: { params: IPrams }) => {
  console.log('param', params)

  return (
    <div className="p-8">
      <Container>
        <ProductDetails product={product} />
        <div className="flex flex-col mt-20 gap-4">
          <div></div>
          <ListRating product={product} />
        </div>
      </Container>
    </div>
  )
}

export default Product
