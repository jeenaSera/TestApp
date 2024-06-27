export interface RatesDto {
  ticker: string;
  baseCurrency: string;
  quoteCurrency: string;
  priceData: PricesDto[];
}

export interface PricesDto {
  date: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  volumeNotional: number;
  tradesDone: number;
}
