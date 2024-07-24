import { useState } from "react";
import "./Main.css"


function Main() {
    
    const [employees, setEmployees] = useState([]);
    fetch("http://localhost:3000/employees")
    .then(response => response.json())
    .then(data => setEmployees(data));

    return (
        <div className="mainContent">
            <div>
                <div className="title">Titulo</div>
                <input type="text" className="inputSearch"  placeholder="Pesquisar"/>
            </div>
            <table className="tableEmployee">
                <thead className="tableHead">
                    <tr>
                        <th>FOTO</th>
                        <th>NOME</th>
                        <th>CARGO</th>
                        <th>DATA DE ADMISSÃO</th>
                        <th>TELEFONE</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee => (
                        <tr className="tableRow">
                            <td>
                                <img className="imgEmployee" src={employee.image} alt={employee.name}/>
                            </td>
                            <td>{employee.name}</td>
                            <td>{employee.job}</td>
                            <td>{employee.admission_date}</td>
                            <td>{employee.phone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Main;