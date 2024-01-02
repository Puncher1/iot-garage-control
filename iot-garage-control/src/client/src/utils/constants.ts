export class Server {
    static apiBaseURL = "http://172.20.10.2/api"
    static sseBaseURL = "http://172.20.10.2/sse"
}

export class ErrorMessages {
    static offline = "You're offline! Make sure you have an internet connection."
    static connection = "Connection to server lost, please try again."
}
