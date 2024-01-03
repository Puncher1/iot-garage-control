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
    requestFunc: (_: any) => Promise<boolean>,
}

type ReceiveDataType = Record<string, ReceiveTitleValuesType>
type TransmitDataType = Record<string, TransmitTitleValuesType>

export const receiveData: ReceiveDataType = {
    "Authentifizierung": {
        rows: ["Letztes Login", "Status"],
        dataHeadKey: "auth",
        dataKeys: ["last_login", "status"],
        dataMap: {
            "status": {
                0: "Erfolgreich",
                1: "Fehlgeschlagen"
            }
        }
    },
    "Torsteuerung": {
        rows: ["Status"],
        dataHeadKey: "gate_control",
        dataKeys: ["status"],
        dataMap: {
            "status": {
                0: "Geöffnet",
                1: "Pausiert",
                2: "Geschlossen"
            }
        }
    },
    "CO2-Messung": {
        rows: ["Status"],
        dataHeadKey: "co2_meas",
        dataKeys: ["status"],
        dataMap: {
            "status": {
                0: "OK",
                1: "Schlecht"
            }
        }
    },
    "Luftqualitätsmessung": {
        rows: ["Status"],
        dataHeadKey: "air_meas",
        dataKeys: ["status"],
        dataMap: {
            "status": {
                0: "OK",
                1: "Schlecht"
            }
        }
    },
    "Lüftungssteuerung": {
        rows: ["Öffnung"],
        dataHeadKey: "air_control",
        dataKeys: ["status"],
        dataMap: {
            "status": {
                0: "0%",
                1: "25%",
                2: "50%",
                3: "75%",
                4: "100%"
            }
        }
    },
}

export const transmitData: TransmitDataType = {
    "Torsteuerung": {
        rows: ["Status"],
        route: "/gate-control",
        paramKeys: ["status"],
        options: [["Öffnen", "Pausieren", "Schliessen"]],
        requestFunc: editGateControl,
    },
    "Lüftungssteuerung": {
        rows: ["Öffnung"],
        route: "/air-control",
        paramKeys: ["status"],
        options: [["0%", "25%", "50%", "75%", "100%"]],
        requestFunc: editAirControl,
    },
}
