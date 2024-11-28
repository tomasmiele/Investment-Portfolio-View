import { config } from "../../../../config/config"

export async function registerApi(name: string, email: string, password: string): Promise<{[key: string]: any}> {
    let options: RequestInit = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name, email, password}), 
        credentials: "include"
    }

    let response = await fetch(config.apiBaseUrl + "/user/auth/register", options)
    let responseData = await response.json()

    return responseData
}