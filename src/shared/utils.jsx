import { Bounce, toast } from "react-toastify"

/* eslint-disable no-restricted-globals */
export const range = (start, end) => {
  const length = end - start + 1
  return Array.from({ length }, (_, idx) => idx + start)
}

export const debounce = (callBack, delay = 500) => {
  let timeout
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      callBack(...args)
    }, delay)
  }
}

export const parseParams = (params = '') => {
  const urlParams = new URLSearchParams(params)
  const array = [
    'size',
    'search',
    'pageNumber',
    'aFilters',
    'aStatusFiltersInput',
    'aStatus',
    'aCountryFilter',
    'aRoleFilter',
    'aCodeFilters',
    'eDesignationFilter',
    'aCategoryFilters',
    'aTagFilters',
    'aFilter',
    'eState',
    'aState',
    'aTeamTagFilters',
    'aVenueTagFilters',
    'aSeriesFilters',
    'aAuthorsFilters',
    'aType',
    'eGender',
    'eType',
    "eCategory",
    "userType"
  ]
  const value = Object.fromEntries(urlParams.entries())
  Object.keys(value).forEach((key) => {
    if (array.includes(key)) {
      value[key] = value[key].split(',')
    }
  })
  return value
}

export const appendParams = (value) => {
  const params = parseParams(location.search)
  const data = { ...params, ...value }
  Object.keys(data).filter((e) => (data[e] === '' || !data[e].toString().length) && delete data[e])
  window.history.pushState({}, null, `${location.pathname}?${new URLSearchParams(data).toString()}`)
}

// will display as 1st, 2nd, 3rd and so on
export const ordinalSuffix = num => {
  const lastDigit = num % 10;
  if (lastDigit === 1) {
    return `st`
  } else if (lastDigit === 2) {
    return `nd`
  } else if (lastDigit === 3) {
    return `rd`
  } else {
    return `th`
  }
}

export const ReactToastify = (msg, type, customId) => {
  switch (type) {
    case 'success':
      toast.success(msg, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "light",
        transition: Bounce,
      })
      break;
    case 'error':
      toast.error(msg, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "light",
        transition: Bounce,
        toastId: customId
      })
      break;
    default:
      break;
  }
}