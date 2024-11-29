import { config } from "../../../../config/config"

export async function addStockApi(stock: string, amountType: string, amount: string | number): Promise<{[key: string]: any}> {
    let options: RequestInit = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({stock, amountType, amount}), 
        credentials: "include"
    }

    let response = await fetch(config.apiBaseUrl + "/user/homepage/add/stock", options)
    let responseData = await response.json()

    return responseData
}