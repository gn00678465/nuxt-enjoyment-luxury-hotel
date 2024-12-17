export default defineNuxtPlugin((nuxtApp) => {

  const formatNumber = (number: MaybeRef<number>, locale?:string, options?: Intl.NumberFormatOptions) => {
    // 确保仅在客户端执行
    if (import.meta.client) {
      return new Intl.NumberFormat(
        locale || 'zh-TW',
        options || {
          style: 'decimal',
          currency: 'TWD',
          minimumFractionDigits: 0,
        }
      ).format(toValue(number))
    }
    // 服务器端返回原始数字
    return number.toString()
  }

  return {
    provide: { formatNumber }
  }
})