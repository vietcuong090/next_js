'use client'

import { CartContextProvder } from '@/hooks/useCart'

interface CartProviderProps {
  children: React.ReactNode
}
const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  return <CartContextProvder>{children}</CartContextProvder>
}

export default CartProvider
