import type { FetchOptions } from 'ofetch'
import { request } from "./core";
import type { AuthEntry, SignupReqBody, LoginReqBody, UserDataReqBody } from '~/types';

/**
 * 註冊
 * @param options 
 * @returns 
 */
export const postSignup = (options?: FetchOptions<'json', SignupReqBody>) => request<AuthEntry>('/api/v1/user/signup',{
  method: 'post',
  ...options
})