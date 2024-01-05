'use client'

import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { useCart } from "@/hooks/use-cart"
import { Product } from "../payload-types"

export default function AddToCartButton({product} : {product : Product}) {
    const [added,setAdded] = useState<Boolean>(false)
    const {addItem} = useCart()
    useEffect(() => {
        const Timer = setTimeout(() => {
            setAdded(false)
        }, 1500);
        return () => clearTimeout(Timer)
    },[added])
  return (
    <Button onClick={() => {
      setAdded(true)
      addItem(product)
    }} size="lg" className="w-full text-lg">{added ? "Added!" : "Add To Cart"}</Button>
  )
}
