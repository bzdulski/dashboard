export const useResetParam = (param, setParam) => {
    param.delete("search")
    param.delete("status")
    setParam(param)
}