export interface ReceiveTitleValuesType {
    rows: string[],
    dataHeadKey: string,
    dataKeys: string[],
}
type ReceiveDataType = Record<string, ReceiveTitleValuesType>

export const recData: ReceiveDataType = {
    "Authentifizierung": {
        rows: ["Letztes Login", "Status"],
        dataHeadKey: "auth",
        dataKeys: ["last_login", "status"],
    },
    "Torsteuerung": {
        rows: ["Status"],
        dataHeadKey: "gate_control",
        dataKeys: ["status"],
    },
    "CO2-Messung": {
        rows: ["Status"],
        dataHeadKey: "co2_meas",
        dataKeys: ["status"],
    },
    "Luftqualitätsmessung": {
        rows: ["Status"],
        dataHeadKey: "air_meas",
        dataKeys: ["status"],
    },
    "Lüftungssteuerung": {
        rows: ["Status"],
        dataHeadKey: "air_control",
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
