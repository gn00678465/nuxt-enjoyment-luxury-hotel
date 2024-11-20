/**
 * 策略模式
 */
export type ExecStrategyAction = [boolean, () => void]
export type ExecStrategyActions = ExecStrategyAction[]

export function execStrategyActions(actions: ExecStrategyActions): void {
  [...actions].some(([flag, action]) => {
    if (flag) {
      action();
    }
    return false;
  });
}