import { useContext } from "react";

import { ErrorContextType } from "../utils/types";
import ErrorContext from "../contexts/errorContext";


export default function useErrorContext(): ErrorContextType {
    return useContext(ErrorContext);
}
