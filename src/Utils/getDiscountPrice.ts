const getDiscountPrice = (price: number, discount: number): number => {
  if (discount === 0 || !discount) {
    return price
  }
  return price * (1 - discount / 100)
}
export default getDiscountPrice
