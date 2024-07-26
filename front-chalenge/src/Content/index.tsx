import { useEffect, useState } from 'react';
import './Content.css'
import { Employee, TreatedEmployee } from '../utils/types';
import LogoSearch from './logoSearch';

const MainContent = () => {
    const [search, setSearch] = useState('')
    const [dbEmployees, setDbEmployees] = useState([] as Employee[])	
    const [listRh, setListRh] = useState([] as Employee[])

    useEffect(() => {
        fetch('http://localhost:3000/employees')
            .then(response => response.json())
            .then(data => {
                setDbEmployees(data)
                setListRh(data)
            })
    }, [])

    function FilterRH(info: string){
        setSearch(info)
        const filtered = dbEmployees.filter((employee: TreatedEmployee) => {
            const { name, job, admission_date, phone } = employee
            const treated = { name, job, admission_date, phone }
            return Object.values(treated).join('').toLowerCase().includes(info.toLowerCase())
        })
        setListRh(filtered);
        // Pesquisar por data não funciona adequademente, já que o fomato da data é diferente.
    }

    function ToDateFormat(date: string){
        const OnlyDate = date.split('T')[0]
         const dateArray = OnlyDate.split('-')
        return `${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`
    }

    function ToPhoneFormat(phone:string) {
        const phoneArray = phone.split('')
        const ddd = phoneArray.slice(0, 2).join('')
        const firstPart = phoneArray.slice(3, 7).join('')
        const secondPart = phoneArray.slice(7, 11).join('')
        return `(${ddd}) ${phoneArray[2]}${firstPart}-${secondPart}`
    }


    return (
        <div className='mainContent'>
            <div className='headContent'>
                <div className='titleContent'>Funcionários</div>
                <label htmlFor="search" className='labelSearch'>
                <input
                    id='search'
                    className='InputSearch'
                    type="text"
                    placeholder="Pesquisar"
                    value={search}
                    onChange={(e) => FilterRH(e.target.value)} />
                    <LogoSearch />
                </label>

            </div>
            <table className='tableEmployee'>
                <thead>
                    <tr>
                        <th>FOTO</th>
                        <th>NOME</th>
                        <th>CARGO</th>
                        <th>DATA DE ADMISSÃO</th>
                        <th>TELEFONE</th>
                    </tr>
                </thead>
                <tbody>
                    {listRh.map((employee: Employee) => {
                        const { name, job, admission_date, phone ,image} = employee
                        return(
                        <tr key={name}>
                            <td>
                                <img src={image} width='34px' alt={name} />
                            </td>
                            <td>{name}</td>
                            <td>{job}</td>
                            <td>{ToDateFormat(admission_date)}</td>
                            <td>{ToPhoneFormat(phone)}</td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default MainContent;