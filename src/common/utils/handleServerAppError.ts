import { Dispatch } from "redux";
import { BaseResponce } from "../types/types";
import { setAppErrorAC, setAppStatusAC } from "../../app/app-reducer";


export const handleServerAppError = <T, >(data: BaseResponce<T>, dispatch: Dispatch) => {
    if(data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC("Some error occured"))
    }
    dispatch(setAppStatusAC("failed"))

}