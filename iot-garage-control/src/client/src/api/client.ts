import ky from "ky";

const client = ky.extend({
    prefixUrl: "172.20.10.2/api"
})

export default client;
