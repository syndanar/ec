import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

type commonErrorHandlers = 'DataError' | 'SuccessExpected'

export class ApiHandler {
  // eslint-disable-next-line class-methods-use-this
  public request(config: AxiosRequestConfig) {
    return axios.request(config);
  }

  // eslint-disable-next-line class-methods-use-this
  public statusError(response: AxiosResponse, expectedStatus: number) {
    if (response.status !== expectedStatus) {
      console.error(`Response status ${response.status} but expected ${expectedStatus}`);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  public errorHandlers(response: AxiosResponse, handlers: commonErrorHandlers[]) {
    if (handlers.includes('DataError') && response?.data?.Error) {
      console.error(`Data error ${response.data.Error}`);
    }
    if (handlers.includes('SuccessExpected') && !response?.data?.Success) {
      console.error('Data success flag expected but is not found');
    }
  }
}
