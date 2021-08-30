import axios, { AxiosError, AxiosResponse } from 'axios'
import { NASA_BASE_URL } from 'app/constants'
import { HttpStatusCodes } from 'app/utility/enums/http-status-codes'
import { toast } from 'react-toastify'

export const axiosInstance = axios.create({
  baseURL: NASA_BASE_URL,
})

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    switch (error.response?.status) {
      case HttpStatusCodes.Unauthorized:
      case HttpStatusCodes.BadRequest:
      case HttpStatusCodes.ConflictError:
        break
      case HttpStatusCodes.InternalServerError:
        if (process.env.NODE_ENV === 'development') {
          toast.error('Internal Server Error')
        } else {
          toast.error('Something went wrong')
        }
        break
      default:
        break
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
