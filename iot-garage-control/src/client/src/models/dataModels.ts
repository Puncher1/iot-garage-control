import { GateControlOption, AirControlOption } from "../utils/enums"
import { editGateControl, editAirControl } from "../services/api"


export interface ReceiveTitleValuesType {
    rows: string[],
    dataHeadKey: string,
    dataKeys: string[],
}

interface TransmitTitleValuesType {
    rows: string[],
    route: string,
    paramKeys: string[],
    options: string[][],
    enum: any,
    requestFunc: (_: any) => Promise<boolean>,
}

type ReceiveDataType = Record<string, ReceiveTitleValuesType>
type TransmitDataType = Record<string, TransmitTitleValuesType>

export const receiveData: ReceiveDataType = {
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
        rows: ["Öffnung"],
        dataHeadKey: "air_control",
        dataKeys: ["status"],
    },
}

export const transmitData: TransmitDataType = {
    "Torsteuerung": {
        rows: ["Status"],
        route: "/gate-control",
        paramKeys: ["status"],
        options: [["Öffnen", "Pausieren", "Schliessen"]],
        enum: GateControlOption,
        requestFunc: editGateControl,
    },
    "Lüftungssteuerung": {
        rows: ["Öffnung"],
        route: "/air-control",
        paramKeys: ["status"],
        options: [["0%", "25%", "50%", "75%", "100%"]],
        enum: AirControlOption,
        requestFunc: editAirControl,
    },
}
