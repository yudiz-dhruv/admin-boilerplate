import { queryClient } from 'App'
let nav

export function setNav(n) {
  nav = n
}

export function navigationTo(link) {
  nav(link)
}

export function removeToken() {
  localStorage.clear('')
  sessionStorage.clear('')
}

export function toaster(message, type) {
  queryClient.defaultOptions.message(message, type)
}

export function getDirtyFormValues(dirtyFields, allValues) {
  if (dirtyFields === true || Array.isArray(dirtyFields)) return allValues
  return Object.fromEntries(Object.keys(dirtyFields).map((key) => [key, getDirtyFormValues(dirtyFields[key], allValues[key])]))
}

export async function getImageFileFromUrl (url) {
  try {
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error(`Failed to fetch the image. Status: ${response.status}`);
      }
      const blob = await response.blob();
      const imageFile = new File([blob], 'image.png', { type: blob.type });

      return imageFile;
  } catch (error) {
      console.error('Error occurred while fetching the image:', error);
  }
}

