'use client'

import { CartProductType, SelectedImgType } from '@/app/product/[productid]/ProductDetails'

interface SetColorProsp {
  images: SelectedImgType[]
  cartProduct: CartProductType
  handColorSelect: (value: SelectedImgType) => void
}

const SetColor: React.FC<SetColorProsp> = ({ images, cartProduct, handColorSelect }) => {
  return (
    <div>
      <div className="flex gap-4 items-center">
        <span className="font-semiblod">COLOR:</span>
        <div className="flex gap-1">
          {images.map((image) => {
            return (
              <div>
                <div
                  key={image.color}
                  onClick={() => handColorSelect(image)}
                  className={`
                h-7
                w-7
                rounded-full
                border-teal-300
                flex
                items-center
                justify-center
                
                ${
                  cartProduct.selectedImg.color === image.color ? 'border-[1.5px]' : 'border-none'
                }`}>
                  <div
                    style={{ background: image.color }}
                    className="
                  h-5
                  w-5
                  rounded-full
                  border-[1.2px]
                  border.salet-300
                  cursor-pointer
                  "></div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SetColor
