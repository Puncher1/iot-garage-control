export class Server {
    static apiBaseURL = "http://172.20.10.2/api"
    static sseBaseURL = "http://172.20.10.2/sse"
}

export class ErrorMessages {
    static unexpected = "An unexpected error occurred."
    static offline = "You're offline! Make sure you have an internet connection."
    static connection = "Receiving data failed, please try again."
    static sending = "Submitting form of {0} failed, please try again."
}
