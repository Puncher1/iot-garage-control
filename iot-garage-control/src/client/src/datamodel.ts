interface RecContentType {
    rows: string[],
    dataKeys: string[],
    route: string
}
type RecDataType = Record<string, RecContentType>

export const recData: RecDataType = {
    "Authentifizierung": {
        rows: ["Letztes Login", "Status"],
        dataKeys: ["lastLogin", "status"],
        route: "/auth"
    },
    "Torsteuerung": {
        rows: ["Status"],
        dataKeys: ["status"],
        route: "/gate"
    },
    "CO2-Messung": {
        rows: ["Status"],
        dataKeys: ["status"],
        route: "co2"
    },
    "Luftqualitätsmessung": {
        rows: ["Status"],
        dataKeys: ["status"],
        route: "air-meas"
    },
    "Lüftungssteuerung": {
        rows: ["Status"],
        dataKeys: ["status"],
        route: "air-control"
    },
}

// export const transRows: DataType = {
//     "Torsteuerung": {
//         rows: ["Status"],
//         route: "/gate"
//     },
//     "Lüftungssteuerung": {
//         rows: ["Status"],
//         route: "/air-control"
//     },
// }
