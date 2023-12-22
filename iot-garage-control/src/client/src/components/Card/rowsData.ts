interface Rows {
    [key: string]: string[]
}

export const recRows:Rows = {
    "Authentifizierung": ["Letztes Login", "Status"],
    "Torsteuerung": ["Status"],
    "CO2-Messung": ["Status"],
    "Luftqualitätsmessung": ["Status"],
    "Lüftungssteuerung": ["Status"],
}

export const transRows:Rows = {
    "Torsteuerung": ["Status"],
    "Lüftungssteuerung": ["Status"],
}
