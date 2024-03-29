import React, { useState, useEffect } from 'react';
import InfoBox from './InfoBox'
import Map from './Map'
import Table from './Table'
import LineGraph from './LineGraph'
import { sortData, prettyPrintStat } from './util'
import { MenuItem, FormControl, Select, Card, CardContent } from "@material-ui/core"
import './App.css';
import 'leaflet/dist/leaflet.css'

import {ThemeProvider} from "styled-components";
import { GlobalStyles } from "./globalStyles";
import { lightTheme, darkTheme } from "./Themes"
import { useDarkMode } from "./useDarkMode"
import Toggle from "./Toggler"


function App() {

  const [theme, themeToggler, mountedComponent] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme :darkTheme;

  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState("worldwide")
  const [countryInfo, setCountryInfo] = useState({})
  const [tableData, setTableData] = useState([])
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 })
  const [mapZoom, setMapZoom] = useState(3)
  const [mapCountries, setMapCountries] = useState([])
  const [casesType, setCasesType] = useState("cases")

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
    .then(response => response.json())
    .then((data) => {
      setCountryInfo(data)
    })
  }, [])

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => ({
          name: country.country,
          value: country.countryInfo.iso2
        }))

        const sortedData = sortData(data)
        setTableData(sortedData)
        setMapCountries(data)
        setCountries(countries)
      })
    }
    getCountriesData()
  }, [])

  const onCountryChange = async (event) => {
    const countryCode = event.target.value

    const url = countryCode === 'worldwide'
      ? 'https://disease.sh/v3/covid-19/all'
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(url)
    .then(response => response.json())
    .then(data => {
      setCountry(countryCode)
      setCountryInfo(data)
      setMapCenter([data.countryInfo.lat, data.countryInfo.long])
      setMapZoom(4)
    })
  }
  if(!mountedComponent) return <div/>
  return (
    <ThemeProvider theme={themeMode}>
      <>
      <GlobalStyles />
      <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h3>COVID-19 TRACKER</h3>
          <div className="app__header-wrapper">
            <h4>Filter : </h4>
            <FormControl className="app__dropdown" style={{ borderRadius: '10px', backgroundColor: 'transparent'}}>
              <Select variant="outlined" onChange={onCountryChange} value={country} style={{ borderRadius: '10px', backgroundColor: 'transparent' }}>
                <MenuItem value="worldwide" style={{ backgroundColor: 'transparent' }}>Worldwide</MenuItem>
                {countries.map((country) => (
                  <MenuItem key={country.name} value={country.value}>{country.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Toggle theme={theme} toggleTheme={themeToggler} />
          </div>
        </div>

        <div className="app__stats ">
          <InfoBox
            isOrange
            active={casesType === "cases"}
            onClick={(e) => setCasesType('cases')}
            title="Cases"
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={prettyPrintStat(countryInfo.cases)}
          />
          <InfoBox
            active={casesType === "recovered"}
            onClick={(e) => setCasesType('recovered')}
            title="Recovered"
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={prettyPrintStat(countryInfo.recovered)}
          />
          <InfoBox
            isRed
            active={casesType === "deaths"}
            onClick={(e) => setCasesType('deaths')}
            title="Deaths"
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={prettyPrintStat(countryInfo.deaths)}
          />
        </div>

        <Map
          casesType={casesType}
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
      <Card className="app__right" style={{backgroundColor: "transparent"}}>
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData} />
          <h3 className="app__title">Worldwide new {casesType}</h3>
          <LineGraph className="app__graph " casesType={casesType}/>
        </CardContent>
      </Card>
    </div>
      </>
    </ThemeProvider>

  );
}

export default App;
