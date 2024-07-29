import { useEffect, useState } from 'react';
import './Content.css'
import { Employee } from '../utils/types';
import { FilterDB } from '../utils/FilterDB';
import { ToDateFormat, ToPhoneFormat } from '../utils/IntoFormat';
import LogoSearch from './logoSearch';
import VectorRow from './mobileTable';
import ElipseHead from './elipseHead';

const MainContent = () => {
    const [search, setSearch] = useState('')
    const [dbEmployees, setDbEmployees] = useState([] as Employee[])
    const [listRh, setListRh] = useState([] as Employee[])
    const [visible, setVisible] = useState('')

    useEffect(() => {
        fetch('http://localhost:3000/employees')
            .then(response => response.json())
            .then(data => {
                setDbEmployees(data)
                setListRh(data)
            })
    }, [])

    function FilterRH(info: string) {
        setSearch(info)
        const filtered = FilterDB(info, dbEmployees)
        setListRh(filtered);
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
                        <th className='webTable'>CARGO</th>
                        <th className='webTable'>DATA DE ADMISSÃO</th>
                        <th className='webTable'>TELEFONE</th>
                        <td className='mobileTable'><ElipseHead /></td>
                    </tr>
                </thead>
                <tbody>
                    {listRh.map((employee: Employee) => {
                        const { name, job, admission_date, phone, image } = employee
                        return (
                            <>
                                <tr key={name}>
                                    <td><img id='imageWeb' src={image} width='34px' alt={name} /></td>
                                    <td>{name}</td>
                                    <td className='webTable'>{job}</td>
                                    <td className='webTable'>{ToDateFormat(admission_date)}</td>
                                    <td className='webTable'>{ToPhoneFormat(phone)}</td>
                                    <td
                                        onClick={() => setVisible(visible === name ? '' : name)}
                                        className='mobileTable'>
                                        <VectorRow />
                                    </td>
                                </tr>
                                {(visible === name) && (
                                    <>
                                        <tr className='webHeadRow'>
                                            <td>CARGO</td>
                                            <td>DATA DE ADMISSÃO</td>
                                            <td width='151px'>TELEFONE</td>
                                        </tr>
                                        <tr className='webBodyRow'>
                                            <td >{job}</td>
                                            <td>{ToDateFormat(admission_date)}</td>
                                            <td>{ToPhoneFormat(phone)}</td>
                                        </tr>
                                    </>
                                )}
                            </>
                        )})}
                </tbody>
            </table>
        </div>
    )
}

export default MainContent;