import {TreatedEmployee, Employee} from '../utils/types'

export function FilterDB(info: string , dbRH: Employee[]) {
    const filtered = dbRH.filter((employee: TreatedEmployee) => {
        const { name, job, admission_date, phone } = employee
        const treated = { name, job, admission_date, phone }
        return Object.values(treated).join('').toLowerCase().includes(info.toLowerCase())
    })
    return filtered;
    // Pesquisar por data não funciona adequademente, já que o fomato da data é diferente.
}