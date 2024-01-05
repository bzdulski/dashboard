export const useTimestamp = (timestamp) => {
    let date = new Date(timestamp?.seconds * 1000)

	let mm = date.getMonth()+1
	let dd = date.getDate()
	let yyyy = date.getFullYear()

    let hours = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()

    return date = hours+`:`+minutes+`:`+seconds+` | `+dd+`/`+mm+`/`+yyyy
}