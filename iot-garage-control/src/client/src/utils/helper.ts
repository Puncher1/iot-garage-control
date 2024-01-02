import { ErrorType } from "./enums"


interface errorBannerReturnType {
    isErrorBanner: boolean,
    errorType: ErrorType | null,
    errorMessage: string,
    bannerSizeClass: string
}

export function errorBanner(isError: boolean, isOnline: boolean): errorBannerReturnType {
    let isErrorBanner = false
    let errorMessage = ""
    let errorType = null
    let bannerSizeClass = ""

    if (!isOnline || isError) {
        isErrorBanner = true
        if (!isOnline) {
            errorType = ErrorType.offline
            errorMessage = "You're offline! Make sure you have an internet connection."
            bannerSizeClass = "error-banner-offline"
        }
        else if (isError) {
            errorType = ErrorType.receiving
            errorMessage = "Connection to server lost, please try again."
            bannerSizeClass = "error-banner-unexpected"
        }
    }

    return { isErrorBanner, errorType, errorMessage, bannerSizeClass }
}
