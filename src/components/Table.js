import React from 'react'
import numeral from 'numeral'
import './Table.css'

function Table({ countries }) {
    return (
        <div className="table" style={{backgroundColor: "transparent"}}>
            {countries.map(({country, cases, countryInfo}) => (
                <tr>
                    <td><img alt="countryflag" src={countryInfo.flag} className="table__img" ></img></td>
                    <td>{country}</td>
                    <td>
                        <strong>{numeral(cases).format("0,0")}</strong>
                    </td>
                </tr>
            ))}
        </div>
    )
}

export default Table
