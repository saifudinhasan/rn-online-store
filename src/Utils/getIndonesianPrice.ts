const getIndonesianPrice = (price: number): string => {
  return `Rp${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')},-`
}

export default getIndonesianPrice
