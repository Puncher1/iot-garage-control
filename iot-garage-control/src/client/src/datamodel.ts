interface RecContentType {
    rows: string[],
    dataKeys: string[],
}
type RecDataType = Record<string, RecContentType>

export const recData: RecDataType = {
    "Authentifizierung": {
        rows: ["Letztes Login", "Status"],
        dataKeys: ["lastLogin", "status"],
    },
    "Torsteuerung": {
        rows: ["Status"],
        dataKeys: ["status"],
    },
    "CO2-Messung": {
        rows: ["Status"],
        dataKeys: ["status"],
    },
    "Luftqualitätsmessung": {
        rows: ["Status"],
        dataKeys: ["status"],
    },
    "Lüftungssteuerung": {
        rows: ["Status"],
        dataKeys: ["status"],
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
