import { IApiService } from '@/constants/interfaces/IApiService';
import { ApiGoods } from '@/services/api/handlers/goods';
import { ApiNames } from '@/services/api/handlers/names';
import { ApiRates } from '@/services/api/handlers/rates';

class ApiService implements IApiService {
  public goods = new ApiGoods();

  public names = new ApiNames();

  public rates = new ApiRates();
}

export const apiService: IApiService = new ApiService();
