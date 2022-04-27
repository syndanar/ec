import { ApiHandler } from '@/services/api/ApiHandler';
import { NamesDto } from '@/services/api/dto/NamesDto';

const endpoints = {
  names: '/names.json',
};

export class ApiNames extends ApiHandler {
  public async fetch(): Promise<NamesDto> {
    const response = await this.request({
      url: endpoints.names,
      method: 'get',
    });

    this.statusError(response, 200);

    return response.data || [];
  }
}
