const validators = {
  valueIsEmpty: value => !value || value === '',
  valueHasNumbers: value => (value ? Array.isArray(value.match(/[0-9]/g)) : false),
  valueLengthIsUnder: (value, length) => value.toString().length < length,
  valueLengthIsAbove: (value, length) => value.toString().length > length
}

export default validators
