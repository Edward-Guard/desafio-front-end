export function ToDateFormat(date: string) {
    const OnlyDate = date.split('T')[0]
    const dateArray = OnlyDate.split('-')
    return `${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`
}

export function ToPhoneFormat(phone: string) {
    const phoneArray = phone.split('')
    const ddd = phoneArray.slice(0, 2).join('')
    const firstPart = phoneArray.slice(3, 7).join('')
    const secondPart = phoneArray.slice(7, 11).join('')
    return `(${ddd}) ${phoneArray[2]}${firstPart}-${secondPart}`
}