import axios, { Method } from "axios"
import { ICachedData } from "./types"


// function to handle request that should be cached (default life-time 1 hour)
export async function cachedRequest<ResponseType> (method: Method, url: string, key: string, lifeTime = 60000 * 60): Promise<ResponseType> {
    const cachedData = getFromLocalStorage<ICachedData<ResponseType>>(key)
    if (cachedData) {
        const currentDate = new Date().valueOf()
        // data exist but lifeTime expired, return new info
        if (currentDate - cachedData.lifeTime > cachedData.timeStamp) {
            cachedData.timeStamp = currentDate
            updateLocalStorage(key, cachedData)
            const { data } = await axios<ResponseType>({ method, url })
            return data
        } else {
            // data exist and lifeTime not expired, return cached info
            return cachedData.data
        }
    } else {
        // data dont exist, return new info
        const { data } = await axios<ResponseType>({ method, url })
        const dataToCache: ICachedData<ResponseType> = {
            data,
            lifeTime,
            timeStamp: new Date().valueOf(),
        }
        updateLocalStorage(key, dataToCache)
        return data
    }
}

export const getFromLocalStorage = <DataType>(key: string):DataType | null => {
    const stringifiedData = localStorage.getItem(key)
    if (stringifiedData) {
        return JSON.parse(stringifiedData) as DataType
    }
    return null
}

export const updateLocalStorage = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data))
}