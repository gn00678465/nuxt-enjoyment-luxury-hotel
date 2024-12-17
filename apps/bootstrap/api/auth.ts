import type { FetchOptions } from 'ofetch'
import { request } from "./core";
import type { AuthResponse, SignupReqBody } from '~/types';

/**
 * 註冊
 * @param options 
 * @returns 
 */
export const postSignup = (options?: FetchOptions<'json', SignupReqBody>) => request<AuthResponse>('/api/v1/user/signup',{
  method: 'post',
  ...options
})