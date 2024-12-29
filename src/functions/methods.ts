export const checkIsValidForm = form =>
  Object.keys(form)
    .map(input => form[input].isValid ?? true)
    .every(validationState => validationState)

export const sendObjValues = form =>
  Object.keys(form)
    .map(input => form[input] && { [input]: form[input].value })
    .reduce((parsedForm, inputWithValue) => {
      return {
        ...parsedForm,
        ...inputWithValue
      }
    }, {})

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
