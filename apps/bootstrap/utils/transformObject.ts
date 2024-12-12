/**
 * 根據指定的鍵和轉換器函數，對原始物件進行轉換
 * 
 * @template T 原始物件的型別
 * @template K 轉換的鍵型別
 * @template R 轉換後的值型別
 * 
 * @param origin 原始物件
 * @param keys 需要轉換的鍵陣列
 * @param adaptor 轉換函數，將原始值轉換為新值
 * @returns 處理後的新物件
 */
export function transformObject<T, K extends keyof T, R>(
  origin: T, 
  keys: K[], 
  adaptor: (value: T[K]) => R
): { [P in keyof T]: P extends K ? R : T[P] } {
  // 建立一個新的物件，保留未轉換的原始屬性
  const result = { ...origin } as { [P in keyof T]: P extends K ? R : T[P] };

  // 遍歷指定的鍵，並使用轉換器函數進行轉換
  keys.forEach(key => {
    // 使用型別斷言來解決型別不兼容問題
    (result[key] as R) = adaptor(origin[key]);
  });

  return result;
}