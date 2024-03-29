import React from 'react'
import { Card, CardContent, Typography } from "@material-ui/core"
import './InfoBox.css'

function InfoBox({ title, cases, total, active, isRed, isOrange, ...props }) {
    return (
        <Card
            onClick={props.onClick}
            style={{backgroundColor: "transparent"}}
            className= {`infoBox 
                ${active && "infoBox--selected"} 
                ${isRed && "infoBox--red"}
                ${isOrange && "infoBox--orange"}`
            }
        >
            <CardContent>
                <h4 className="infoBox__title" color="textSecondary">
                    {title}
                </h4>
                <h2 className={`infoBox__cases 
                    ${!isRed & !isOrange && "infoBox__cases--green"}
                    ${isRed && "infoBox__deaths"}
                    `}>{cases} <span> / today</span></h2>
                <Typography className="infoBox__total" color="textSecondary">
                    {total} Total
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox
