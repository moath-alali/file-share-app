import axios from 'axios'
import { apiURL } from "../config";
export const getDownloadInfo = (id) => {
    const url = `${apiURL}/share-links/${id}`;
    return axios.get(url);
}