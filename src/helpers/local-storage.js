const loggedUser = 'loggedUser'

export const setStorage = (item, data) => localStorage.setItem(item, JSON.stringify(data))

export const getStorage = (item) => JSON.parse(localStorage.getItem(item))

export const clearStorage = (item) => localStorage.removeItem(item)

export const clearAllStorage = () => localStorage.clear();

export const setLoggedUser = (data) => setStorage(loggedUser, data)

// USER FOR USERS SESSION ONLY
export const getLoggedUser = () => getStorage(loggedUser) || null

export const logoutUser = () => clearStorage(loggedUser)