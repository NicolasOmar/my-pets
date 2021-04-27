export const mergeGraphObj = (graphObj, originalObj) => {
  delete graphObj.__typename
  return {
    ...originalObj,
    ...graphObj
  }
}
