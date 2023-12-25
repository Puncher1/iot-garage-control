import client from "./../client";

async function lastLogin() {
    return await client.get("auth/lastLogin");
}

async function status() {
    return await client.get("auth/status");
}
