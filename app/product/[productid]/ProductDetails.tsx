'use client'

import Button from '@/app/components/Button'
import ProductImage from '@/app/components/products/ProductImage'
import SetColor from '@/app/components/products/SetColor'
import SetQuatity from '@/app/components/products/SetQuatity'
import { useCart } from '@/hooks/useCart'
import { Rating } from '@mui/material'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { MdCheckCircle } from 'react-icons/md'

export interface ProductDetailsProps {
  product: any
}

export type CartProductType = {
  id: string
  name: string
  description: string
  category: string
  brand: string
  selectedImg: SelectedImgType
  quatity: number
  price: number
}

export type SelectedImgType = {
  color: string
  colerCode: string
  image: string
}

export const Horizontal = () => {
  return <hr className="w-[30%] my-2" />
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const { handleAddProductToCart, cartProducts } = useCart()
  const [isProductInCart, setIsProductInCart] = useState(false)
  const [CartProduct, setCarProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    selectedImg: { ...product.images[0] },
    quatity: 1,
    price: product.price,
  })
  const router = useRouter()
  console.log(cartProducts)

  useEffect(() => {
    setIsProductInCart(false)

    if (cartProducts) {
      const existringIndex = cartProducts.findIndex((item) => item.id === product.id)

      if (existringIndex > -1) {
        setIsProductInCart(true)
      }
    }
  }, [cartProducts])

  const productRating =
    product.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) /
    product.reviews.length

  const handleColorSelect = useCallback(
    (value: SelectedImgType) => {
      setCarProduct((prev) => {
        return { ...prev, selectedImg: value }
      })
    },
    [CartProduct.selectedImg],
  )

  const handleQtyIncrease = useCallback(() => {
    if (CartProduct.quatity === 99) {
      return
    }
    setCarProduct((prev) => {
      return { ...prev, quatity: ++prev.quatity }
    })
  }, [CartProduct])
  const handleQtyDecrease = useCallback(() => {
    if (CartProduct.quatity === 1) {
      return
    }
    setCarProduct((prev) => {
      return { ...prev, quatity: --prev.quatity }
    })
  }, [CartProduct])

  return (
    <div
      className="grid grid-cols-1
  md:grid-cols-2 gap-12">
      <ProductImage
        CartProduct={CartProduct}
        product={product}
        handleColorSelect={handleColorSelect}
      />
      <div
        className="flex flex-col gap-1
       text-slate-500 text-sm">
        <h2
          className="text-3xl font-medium
        text-slate-70">
          {product.name}
        </h2>
        <div className="flex item-center gap-2">
          <Rating value={productRating} readOnly />
          <div>{product.reviews.length}reviews</div>
        </div>
        <Horizontal />
        <div className="" text-justify>
          {product.description}
        </div>
        <Horizontal />
        <div>
          <span className="font-semibold">CATEGORY:</span> {product.category}
        </div>
        <div>
          <span className="font-semibold">BRAND:</span> {product.brand}
        </div>
        <div
          className="{product.inStock ?
        'text-teal-400' : 'text-rose-400'}">
          {product.inStock ? 'In stock' : 'Out of stock'}
        </div>
        <Horizontal />
        {isProductInCart ? (
          <>
            <p className="mb-2 text-slate-500 flex items-center gap-1">
              <MdCheckCircle className="text-teal-400" size={20} />
              <span>Product added to cart</span>
            </p>
            <div className="max-h-[300px]">
              <Button
                lable="VieW Cart"
                outline
                onClick={() => {
                  router.push('/cart')
                }}
              />
            </div>
          </>
        ) : (
          <>
            <SetColor
              cartProduct={CartProduct}
              images={product.images}
              handColorSelect={handleColorSelect}
            />
            <Horizontal />
            <SetQuatity
              cartProduct={CartProduct}
              handleQtyIncrease={handleQtyIncrease}
              handleQtyDecrease={handleQtyDecrease}
            />
            <Horizontal />
            <div className="max-w-[300px]">
              <Button lable="ADD TO CART" onClick={() => handleAddProductToCart(CartProduct)} />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ProductDetails
