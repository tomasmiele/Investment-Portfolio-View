import { config } from "../../../../config/config"

export async function sendPwdRecoveryEmailApi(email: string): Promise<{[key: string]: any}> {
    let options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email})
    }

    let response = await fetch(config.apiBaseUrl + "/user/auth/pwd/recovery/email", options)
    let responseData = await response.json()

    return responseData
}