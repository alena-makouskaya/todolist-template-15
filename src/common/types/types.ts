export type BaseResponce<D = {}> = {
    data: D
    resultCode: number
    messages: Array<string>
}