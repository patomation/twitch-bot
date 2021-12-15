// WARNING: timer is shared with every instance could cause bugs
// Make a new instance for a different timer

export type Callback = (...args: (string | boolean | number | number[] | Record<string, unknown>)[]) => void

export default class Delay {
  constructor (callback?: Callback, ms?: number) {
    if (callback) {
      this.start(callback, ms)
    }
  }

  timer = 0
  /**
 * A callback Delay function
 * @param callback Callback method
 * @param ms delay time
 */
  start (callback: Callback, ms = 1000): void {
    this.cancel()
    this.timer = setTimeout(callback, ms) as unknown as number
  }

  cancel (): void {
    clearTimeout(this.timer)
  }
}
