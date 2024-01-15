import { editGateControl, editAirControl } from "../services/api"


export interface ReceiveTitleValuesType {
    rows: string[],
    dataHeadKey: string,
    dataKeys: string[],
    dataMap: Record<string, Record<number, string>>
}

interface TransmitTitleValuesType {
    rows: string[],
    route: string,
    paramKeys: string[],
    options: string[][],
    dataMap: Record<string, Record<string, number>>
    requestFunc: (_: any) => Promise<boolean>,
}

type ReceiveDataType = Record<string, ReceiveTitleValuesType>
type TransmitDataType = Record<string, TransmitTitleValuesType>

export const receiveData: ReceiveDataType = {
    "Authentifizierung": {
        rows: ["Letztes Login"],
        dataHeadKey: "auth",
        dataKeys: ["last_login"],
        dataMap: {}
    },
    "Torsteuerung": {
        rows: ["Status"],
        dataHeadKey: "gate_control",
        dataKeys: ["status"],
        dataMap: {
            "status": {
                0: "Geschlossen",
                1: "Geöffnet"
            }
        }
    },
    "CO2-Messung": {
        rows: ["Status"],
        dataHeadKey: "co2_meas",
        dataKeys: ["status"],
        dataMap: {
            "status": {
                0: "Schlecht",
                1: "OK"
            }
        }
    },
    "Luftqualitätsmessung": {
        rows: ["Status"],
        dataHeadKey: "air_meas",
        dataKeys: ["status"],
        dataMap: {
            "status": {
                0: "Schlecht",
                1: "OK"
            }
        }
    },
    "Lüftungssteuerung": {
        rows: ["Öffnung"],
        dataHeadKey: "air_control",
        dataKeys: ["status"],
        dataMap: {
            "status": {
                5: "0%",
                6: "25%",
                7: "50%",
                8: "75%",
                9: "100%"
            }
        }
    },
}

export const transmitData: TransmitDataType = {
    "Torsteuerung": {
        rows: ["Status"],
        route: "/gate-control",
        paramKeys: ["status"],
        options: [["Öffnen", "Schliessen"]],
        dataMap: {
            status: {
                "Öffnen": 3,
                "Schliessen": 4
            }
        },
        requestFunc: editGateControl,
    },
    "Lüftungssteuerung": {
        rows: ["Öffnung"],
        route: "/air-control",
        paramKeys: ["status"],
        options: [["0%", "25%", "50%", "75%", "100%"]],
        dataMap: {
            status: {
                "0%": 5,
                "25%": 6,
                "50%": 7,
                "75%": 8,
                "100%": 9
            }
        },
        requestFunc: editAirControl,
    },
}
