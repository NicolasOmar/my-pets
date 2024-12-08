const validators = {
  valueIsEmpty: value => !value || value === '',
  valueHasNumbers: value => (value ? Array.isArray(value.match(/[0-9]/g)) : false),
  valueLengthIsUnder: (value, length) => value && value.toString().length < length,
  valueLengthIsAbove: (value, length) => value && value.toString().length > length,
  dateIsBefore: (dateA, dateB) => !!dateA && !!dateB && new Date(dateA) < new Date(dateB)
}

export default validators
