'use client'

import React from 'react'
import { CartProductType, SelectedImgType } from '@/app/product/[productid]/ProductDetails'

interface ProductImageProps {
  CartProduct: CartProductType
  product: any
  handleColorSelect: (value: SelectedImgType) => void
}

const ProductImage: React.FC<ProductImageProps> = ({ CartProduct, product, handleColorSelect }) => {
  return (
    <div
      className="
      flex
      flex-row
      h-full
      max-h-[500px]
      min-h-[300px]
      sm:min-h-[400px]">
      <div
        className="
          flex
          flex-col
          w-52
          ">
        {product.images.map((image: SelectedImgType) => {
          return (
            <div
              key={image.color}
              onClick={() => handleColorSelect(image)}
              className={`
                w -52
                h-52
                rounded 
                border-teal-300
              ${CartProduct.selectedImg.color === image.color ? 'border-[1.5px]' : 'border-none'}`}>
              <img
                src={image.image}
                alt={image.color}
                style={{
                  objectFit: 'contain',
                  width: '100%',
                  height: '100%',
                }}
              />
            </div>
          )
        })}
      </div>
      <div className="flex flex-1">
        <img
          src={CartProduct.selectedImg.image}
          alt={CartProduct.name}
          style={{
            objectFit: 'contain',
            width: '100%',
            height: '100%',
          }}
        />
      </div>
    </div>
  )
}

export default ProductImage
