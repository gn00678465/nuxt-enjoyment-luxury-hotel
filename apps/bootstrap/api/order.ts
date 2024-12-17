import type { FetchOptions } from 'ofetch'
import { request } from "./core";
import type { OrderResponse, OrderReqBody } from '~/types';

export function postOrder(options?: FetchOptions<'json', OrderReqBody>) {
  return request<OrderResponse>('/api/v1/orders/',{
    method: 'post',
    ...options
  })
}