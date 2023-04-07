import axios from "axios";
import { setCookie } from "nookies";

// const loginServiceUrl = 'http://localhost:4001'
const loginServiceUrl = process.env.AUTH_SERVICE_URL
const backendUrl = process.env.BACKEND_URL

export const Validate = async (token) => {
    const responseBody = (await axios.post(`${loginServiceUrl}/validate`, {}, {
        headers: {
            authtoken: token
        }
    })).data

    return responseBody
}

export const SignIn = async ({ email, password }) => {
    const responseBody = (await axios.post(`${loginServiceUrl}/login`, { email, password })).data
    if (responseBody.error == undefined) {
        setCookie(undefined, 'nextAuthToken', responseBody.token, {
            maxAge: 60 * 60 * 1 // 1h
        })
    }
}

export const SignUp = async ({ email, password }) => {
    const responseBody = (await axios.post(`${loginServiceUrl}/register`, { email, password })).data

    setCookie(undefined, 'nextAuthToken', responseBody.token, {
        maxAge: 60 * 60 * 1 // 1h
    })

    return responseBody
}

export const useTicket = async (token, { ticketId }) => {
    const responseBody = (await axios.get(`${backendUrl}/ticket/${ticketId}`, {
        headers: {
            authtoken: token
        }
    })).data

    return responseBody
}

export const SignOut = () => {
    console.log('SignOut')
    setCookie(undefined, 'nextAuthToken', "", {
        maxAge: 60 * 1 // 1m
    })
}
