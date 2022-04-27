import { ApiHandler } from '@/services/api/ApiHandler';
import { RatesDto } from '@/services/api/dto/RatesDto';

const endpoints = {
  rates: 'https://api.coinbase.com/v2/exchange-rates',
};

export class ApiRates extends ApiHandler {
  public async fetch(): Promise<RatesDto> {
    const response = await this.request({
      url: endpoints.rates,
      method: 'get',
    });

    this.statusError(response, 200);

    return response.data || [];
  }
}
