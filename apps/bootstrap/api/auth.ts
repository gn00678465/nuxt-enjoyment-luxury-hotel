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

  /**
   * 登入
   * @param options 
   * @returns 
   */
export const postLogin = (options?: FetchOptions<'json', LoginReqBody>) => request<AuthEntry>('/api/v1/user/login', {
  method: 'post',
  ...options
})

/**
 * 取得使用者資訊
*/
export const fetchUserData = (options?: FetchOptions<'json'>) => request<Omit<AuthEntry, 'token'>>('/api/v1/user/', {
  method: 'get',
  ...options
})

/**
 * 更新使用者資料
 * @param options 
 * @returns 
 */
export const putUserData = (options?: FetchOptions<'json', Partial<UserDataReqBody>>) => request<Omit<AuthEntry, 'token'>>('/api/v1/user/', {
  method: 'put',
  ...options
})