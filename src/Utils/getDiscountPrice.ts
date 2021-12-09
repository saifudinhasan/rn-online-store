const getDiscountPrice = (price: number, discount: number): number =>
  price * (1 - discount / 100)
export default getDiscountPrice
