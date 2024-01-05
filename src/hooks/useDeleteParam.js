export const useDeleteParam = (param, setParam, event) => {
    param.delete(event)
    setParam(param)
}