export const useAddParam = (param, setParam, event, value) => {
    param.set(event, value)
    setParam(param)
}