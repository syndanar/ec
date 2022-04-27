import { ApiGoods } from '@/services/api/handlers/goods';
import { ApiNames } from '@/services/api/handlers/names';
import { ApiRates } from '@/services/api/handlers/rates';

export interface IApiService {
  goods: ApiGoods,
  names: ApiNames,
  rates: ApiRates
}
