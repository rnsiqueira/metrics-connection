import axios from "axios"


const base_url = process.env.NEXT_PUBLIC_PRODUCT_APP


export const request = axios.create({
    baseURL: base_url,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})