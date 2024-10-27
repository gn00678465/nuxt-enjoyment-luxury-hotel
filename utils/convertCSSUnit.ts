/**
 * 將不同單位的數值轉換為像素值，若轉換失敗則返回指定的 feedback 值
 * @param value - 數字或帶單位的字串
 * @param feedback - 當轉換失敗時返回的值
 * @returns 轉換後的像素值或 feedback 值
 */
export function convertCSSUnit(value: string | number, feedback: string | number): string {
  try {
    // 處理數字類型
    if (typeof value === 'number') {
      if (isNaN(value)) {
        return feedback.toString();
      }
      return `${value}px`;
    }

    // 處理字串類型
    const match = value.match(/^([\d.]+)(rem|px|)$/);
    if (!match) {
      return feedback.toString();
    }

    const [, num, unit] = match;
    const numValue = parseFloat(num);

    // 檢查數值是否有效
    if (isNaN(numValue)) {
      return feedback.toString();
    }

    // 根據單位進行轉換
    switch (unit) {
      case 'rem':
        try {
          const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
          return `${numValue * rootFontSize}px`;
        }
        catch {
          // 如果無法獲取 root font-size，返回 feedback
          return feedback.toString();
        }
      case 'px':
        return value;
      case '':
        return `${numValue}px`;
      default:
        return feedback.toString();
    }
  }
  catch {
    // 捕獲任何意外的錯誤，返回 feedback
    return feedback.toString();
  }
}
