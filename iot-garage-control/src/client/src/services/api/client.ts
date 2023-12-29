import ky from "ky"
import { Server as ServerConst } from "../../utils/constants"


const client = ky.extend({
    prefixUrl: ServerConst.apiBaseURL
})

const fetchAuth = async () => {
    console.log("fetchAuth")
    const data = await client.get("auth")
    return data.json()
}

export { fetchAuth }
