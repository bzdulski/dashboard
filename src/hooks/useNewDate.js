export const useNewDate = () => {
    let date = new Date()
    date.setDate(date.getDate() + 30)
    return (date.getDate() < 10 ? "0" : "") + date.getDate() + "." + (date.getMonth() < 9 ? "0" : "") + (date.getMonth() + 1) + "." + date.getFullYear()
}