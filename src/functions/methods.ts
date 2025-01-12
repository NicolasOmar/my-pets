export const debouncer = <T extends (...args: any[]) => void>(func: T, delay: number) => {
  let timer: NodeJS.Timeout
  return function (this: any, ...args: Parameters<T>) {
    const context = this
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(context, args)
    }, delay)
  }
}
