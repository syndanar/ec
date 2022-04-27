import { GoodsDto } from '@/services/api/dto/GoodsDto';
import { ApiHandler } from '@/services/api/ApiHandler';

const endpoints = {
  data: '/data.json',
};

export class ApiGoods extends ApiHandler {
  public async fetch(): Promise<GoodsDto[]> {
    const response = await this.request({
      url: endpoints.data,
      method: 'get',
    });

    if (response.status !== 200) {
      this.statusError(response, 200);
    }

    this.errorHandlers(response, ['DataError', 'SuccessExpected']);

    return response.data?.Value?.Goods || [];
  }
}
