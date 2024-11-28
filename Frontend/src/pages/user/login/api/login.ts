import { config } from "../../../../config/config"

export async function loginApi(email: string, password: string): Promise<{[key: string]: any}> {
    let options: RequestInit = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, password}), 
        credentials: "include"
    }

    let response = await fetch(config.apiBaseUrl + "/user/auth/login", options)
    let responseData = await response.json()

    return responseData
}