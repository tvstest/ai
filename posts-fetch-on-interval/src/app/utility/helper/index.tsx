export const showLoader = (): void => {
  const loaderDiv = document.getElementById('loaderForAPICall')
  if (loaderDiv) {
    loaderDiv.classList.add('loaderShow')
    loaderDiv.classList.remove('loaderHide')
  }
}

export const hideLoader = (): void => {
  const loaderDiv = document.getElementById('loaderForAPICall')
  if (loaderDiv) {
    loaderDiv.classList.remove('loaderShow')
    loaderDiv.classList.add('loaderHide')
  }
}

export const sleep = (m: number): Promise<NodeJS.Timeout> =>
  new Promise((r) => setTimeout(r, m))
