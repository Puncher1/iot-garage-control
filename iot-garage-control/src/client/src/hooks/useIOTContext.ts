import { useContext } from "react";
import IOTDataContext from "../contexts/iotDataContext";
import { IOTDataObjectType } from "../utils/types"


export default function useIOTContext(): IOTDataObjectType {
    return useContext(IOTDataContext)
}
