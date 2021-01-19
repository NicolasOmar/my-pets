export const checkFormValidation = formObj => Object.keys(formObj).map(key => formObj[key].valid).reduce((accumulator, current) => accumulator && current, true)

export const checkEmptyValues = formObj => Object.keys(formObj).map(key => formObj[key].value).reduce((accumulator, current) => accumulator && (!!(current) && current !== ''), true)