import { POST_LOAD_SOURCE_ENDPOINT } from '../constants/apiEndpoint'
import axios from '../shell/axios'
import getQueryPath from '../utils/get-query-path/get-query-path'

export const loadSource = (hash: string) =>
  axios
    .post(getQueryPath(POST_LOAD_SOURCE_ENDPOINT, hash))
    .then((res) => res.data)
