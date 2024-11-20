type PaddingVars = {
  '--padding-top': string;
  '--padding-left': string;
  '--padding-bottom': string;
};

/**
 * 處理 padding 值的解析，支援單一值或多值格式
 * @param value - padding 值字串
 * @returns 解析後的 padding 值物件
 */
function parsePaddingValue(value: string): PaddingVars {
  // 移除多餘空格並分割值
  const values = value.trim().split(/\s+/);

  switch (values.length) {
    case 1:
      // 單一值：所有方向相同
      return {
        '--padding-top': values[0],
        '--padding-left': values[0],
        '--padding-bottom': values[0],
      };

    case 2:
      // 兩個值：第一個為上下，第二個為左右
      return {
        '--padding-top': values[0],
        '--padding-left': values[1],
        '--padding-bottom': values[0],
      };

    case 3:
      // 三個值：上、左右、下
      return {
        '--padding-top': values[0],
        '--padding-left': values[1],
        '--padding-bottom': values[2],
      };

    default:
      // 處理無效輸入，返回第一個值或空字串
      return {
        '--padding-top': values[0] || '',
        '--padding-left': values[0] || '',
        '--padding-bottom': values[0] || '',
      };
  }
}

/**
 * 將 padding 字串轉換為 CSS 變數物件
 * @param padding - padding 值，可接受 1-3 個值的格式
 * @param defaultValue - 預設值，當未提供 padding 時使用
 * @returns 包含 CSS 變數的物件
 */
export function convertPaddingToCSSVars(
  padding?: string,
  defaultValue: string = '0px',
): PaddingVars {
  // 如果沒有傳入 padding，處理預設值
  if (!padding) {
    return parsePaddingValue(defaultValue);
  }

  return parsePaddingValue(padding);
}
