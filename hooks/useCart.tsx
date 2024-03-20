import { CartProductType } from '@/app/product/[productid]/ProductDetails'
import { product } from '@/utils/product'
import { createContext, useCallback, useContext, useEffect, useState } from 'react'

import { toast } from 'react-hot-toast'

type CartContextType = {
  cartTotalQty: number
  cartProducts: CartProductType[] | null
  handleAddProductToCart: (product: CartProductType) => void
}

export const CartContext = createContext<CartContextType | null>(null)

interface Props {
  [propName: string]: any
}
export const CartContextProvder = (props: Props) => {
  const [cartTotalQty, setcartTotalQty] = useState(10)
  const [cartProducts, setCarProducts] = useState<CartProductType[] | null>(null)

  useEffect(() => {
    const cartItems: any = localStorage.getItem('eShopCartItems')
    const cProducts: CartProductType[] | null = JSON.parse(cartItems)

    setCarProducts(cProducts)
  })

  const handleAddProductToCart = useCallback((product: CartProductType) => {
    setCarProducts((prev) => {
      let updateCart

      if (prev) {
        updateCart = [...prev, product]
      } else {
        updateCart = [product]
      }
      toast.success('Product added to cart')
      localStorage.setItem('eShopCartItems', JSON.stringify(updateCart))
      return updateCart
    })
  }, [])

  const value = {
    cartTotalQty,
    cartProducts,
    handleAddProductToCart,
  }
  return <CartContext.Provider value={value} {...props} />
}
export const useCart = () => {
  const context = useContext(CartContext)

  if (context === null) {
    throw new Error('useCart must be used withn a CartContextProvider')
  }
  return context
}
