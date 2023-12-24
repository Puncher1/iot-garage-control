import client from "./../client";


function lastLogin() {
    return client.get("auth/lastLogin");
}

function status() {
    return client.get("auth/status");
}
