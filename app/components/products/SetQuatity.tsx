'use client'

import { CartProductType } from '@/app/product/[productid]/ProductDetails'

interface SetQuatityProps {
  cartCounter?: boolean
  cartProduct: CartProductType
  handleQtyIncrease: () => void
  handleQtyDecrease: () => void
}

const btnStyle = 'border-[1.2px] border-slate-300 px-2 rounded'

const SetQuatity: React.FC<SetQuatityProps> = ({
  cartCounter,
  cartProduct,
  handleQtyIncrease,
  handleQtyDecrease,
}) => {
  return (
    <div className="flex gap-8 items-center">
      {cartCounter ? null : <div className="font-semibold">QUATITY</div>}
      <div className="flex gap-4 items-center text-base">
        <button onClick={handleQtyDecrease} className="{btnStyle}">
          -
        </button>
        <div>{cartProduct.quatity}</div>
        <button onClick={handleQtyIncrease} className="btnStyle">
          +
        </button>
      </div>
    </div>
  )
}

export default SetQuatity
