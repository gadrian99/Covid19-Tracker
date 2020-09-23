import React from 'react'
import numeral from 'numeral'
import './Table.css'

function Table({ countries }) {
    console.log(countries)
    return (
        <div className="table">
            {countries.map(({country, cases, countryInfo}) => (
                <tr>
                    <td><img src={countryInfo.flag} className="table__img" ></img></td>
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
