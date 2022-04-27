export type RatesDto = {
  data: {
    currency: string,
    rates: {
      [currency: string]: number
    }
  }
}
