import { config } from "../../../../config/config"

export async function resetPasswordApi(token: string, password: string): Promise<{[index: string]: any}> {
    let options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({token, password})
    }

    let response = await fetch(config.apiBaseUrl + "/user/auth/reset/pwd", options)
    let responseData = await response.json()

    return responseData
}