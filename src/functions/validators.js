const validators = {
  valueIsEmpty: value => !value || value === '',
  valueHasNumbers: value => (value ? Array.isArray(value.match(/[0-9]/g)) : false)
}

export default validators
