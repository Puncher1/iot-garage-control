import axios, { AxiosResponse } from "axios"

import { Server as ServerConst } from "../utils/constants"
import { AirControlOption, GateControlOption } from "../utils/enums"


const client = axios.create({
    baseURL: ServerConst.apiBaseURL,
})

async function request(method: string, url: string, data: Record<string, any>, headers: Record<string, any>) {
    const config = { method, url, data, headers }

    let isError = false
    let response: AxiosResponse | null = null
    try {
        response = await client.request(config)
    } catch (err: any) {
        console.log(err.response ? err.response.data["message"] : err)
        isError = true
    }

    if (response !== null) {
        if (!(response.status >= 200 && response.status <= 308)) {
            isError = true
        }
    }

    return isError
}

export async function editGateControl(status: GateControlOption): Promise<boolean> {
    const params = { "status": GateControlOption[status] }
    const headers = { "Content-Type": "application/x-www-form-urlencoded" }
    return await request("POST", "/gate-control", params, headers)
}

export async function editAirControl(status: AirControlOption): Promise<boolean> {
    const params = { "status": AirControlOption[status] }
    const headers = { "Content-Type": "application/x-www-form-urlencoded" }
    return await request("POST", "/air-control", params, headers)
}
