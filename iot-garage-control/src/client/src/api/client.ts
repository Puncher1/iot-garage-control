import ky from "ky"


const client = ky.extend({
    prefixUrl: "http://172.20.10.2/api"
})

const fetchAuth = async () => {
    console.log("fetchAuth")
    const data = await client.get("auth")
    return data.json()
}

export { fetchAuth }
