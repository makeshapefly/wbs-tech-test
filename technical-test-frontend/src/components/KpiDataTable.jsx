import React, { useState, useEffect, useMemo } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import "../styles/styles.css";

const KpiDataTable = () => {
  const containerStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

  const TEAM_NAMES = ["fovro", "Fastun", "Nyxx", "CarSpa", "Motion", "Worthwheel", "Carzio", "Rollovo", "iAuto", "VroomTime", "Kar", "EliteTechs", "Carz", "MileMode", "Automotiq", "RYDI", "EvolutionAuto", "Automovo", "ROBOH", "rimovo", "ottobi", "Evi", "Rusted", "Cjio", "NitroRide", "HXH", "SpeedLabs", "TenQ", "Caraxa", "Blazers", "DriveSwitch", "GIIQ", "Teuso", "Hoqa", "AutoInfinite", "vusk", "DentCenter", "Turbo", "evCU", "Electronically", "Drivat", "Torque", "Drift", "Carvato", "Rush", "Matic", "Wheelic", "Slidyn", "Pitpo", "caralo", "Drivesly", "Xuad", "CarLeap", "Tazox", "Amxu", "Honkli"];

  const [rowData, setRowData] = useState([]);
  const [dayNo, setDayNo] = useState('Day 1');

  const columnTypes = useMemo(() => {
    return {
      rank: {
        width: 100,
      },
      team: {
        width: 200,
        fontSize: 40,
      },
    };
  }, []);


  const getData = (date, day) => {
    setDayNo('Day ' + day)
    fetch(process.env.REACT_APP_HOST_IP_ADDRESS + date)
      .then((response) => response.json())
      .then((data) => {
        transformData(data);
      });
  }

  const transformData = (data) => {
    // Create map of row data keyed by Team Name, storing scores and rank across KPIs
    let rowData = TEAM_NAMES.reduce(function (map, obj) {
      map[obj] = {};
      return map;
    }, {});

    let waccSet = new Set()
    let factoryUtilizationSet = new Set()
    let scoresSet = new Set()
    let employeeEngagementSet = new Set()
    let interestCoverageSet = new Set()
    let marketingSpendRevSet = new Set()
    let eCarsSalesSet = new Set()
    let co2PenaltySet = new Set()

    //add scores for each team from source data
    const keys = Object.keys(data)
    keys.forEach(kpi => {
      let kpiData = data[kpi]
      for (let item in kpiData) {
        let kpiValue = rowData[TEAM_NAMES[kpiData[item].team - 1]]
        kpiValue.team = TEAM_NAMES[kpiData[item].team - 1]

        switch (kpi) {
          case 'wacc':
            kpiValue.waccValue = Number(kpiData[item].value)
            waccSet.add(Number(kpiData[item].value))
            break;
          case 'factory_utilization':
            kpiValue.factoryUtilisationValue = Number(kpiData[item].value)
            factoryUtilizationSet.add(Number(kpiData[item].value))
            break;
          case 'scores':
            kpiValue.scoresValue = Number(kpiData[item].value)
            scoresSet.add(Number(kpiData[item].value))
            break;
          case 'employee_engagement':
            kpiValue.employeeEngagementValue = Number(kpiData[item].value)
            employeeEngagementSet.add(Number(kpiData[item].value))
            break;
          case 'interest_coverage':
            kpiValue.interestCoverageValue = Number(kpiData[item].value)
            interestCoverageSet.add(Number(kpiData[item].value))
            break;
          case 'marketing_spend_rev':
            kpiValue.marketingSpendRevValue = Number(kpiData[item].value)
            marketingSpendRevSet.add(Number(kpiData[item].value))
            break;
          case 'e_cars_sales':
            kpiValue.eCarsSalesValue = Number(kpiData[item].value)
            eCarsSalesSet.add(Number(kpiData[item].value))
            break;
          case 'co2_penalty':
            kpiValue.co2PenaltyValue = Number(kpiData[item].value)
            co2PenaltySet.add(Number(kpiData[item].value))
            break;
        }
      }
    })

    console.log(JSON.stringify(rowData)) //left in for the demo


    const scoresArray = Array.from(scoresSet).sort((a, b) => b - a)
    const waccArray = Array.from(waccSet).sort((a, b) => b - a)
    const factoryUtilisationArray = Array.from(factoryUtilizationSet).sort((a, b) => b - a)
    const employeeEngagementArray = Array.from(employeeEngagementSet).sort((a, b) => b - a)
    const interestCoverageArray = Array.from(interestCoverageSet).sort((a, b) => b - a)
    const marketingSpendRevArray = Array.from(marketingSpendRevSet).sort((a, b) => b - a)
    const eCarsSalesArray = Array.from(eCarsSalesSet).sort((a, b) => b - a)
    const co2PenaltyArray = Array.from(co2PenaltySet).sort((a, b) => b - a)

    //set column data in grid
    let tableRows = []
    for (let item in rowData) {
      let itemObj = rowData[item]
      tableRows.push(
        {
          teamName: itemObj.team,
          scoresRank: scoresArray.indexOf(itemObj.scoresValue) + 1, scoresValue: itemObj.scoresValue,
          waccRank: waccArray.indexOf(itemObj.waccValue) + 1, waccValue: itemObj.waccValue,
          factoryUtilisationRank: factoryUtilisationArray.indexOf(itemObj.factoryUtilisationValue) + 1, factoryUtilisationValue: itemObj.factoryUtilisationValue,
          employeeEngagementRank: employeeEngagementArray.indexOf(itemObj.employeeEngagementValue) + 1, employeeEngagementValue: itemObj.employeeEngagementValue,
          interestCoverageRank: interestCoverageArray.indexOf(itemObj.interestCoverageValue) + 1, interestCoverageValue: itemObj.interestCoverageValue,
          marketingSpendRevRank: marketingSpendRevArray.indexOf(itemObj.marketingSpendRevValue) + 1, marketingSpendRevValue: itemObj.marketingSpendRevValue,
          eCarsSalesRank: eCarsSalesArray.indexOf(itemObj.eCarsSalesValue) + 1, eCarsSalesValue: itemObj.eCarsSalesValue,
          co2PenaltyRank: co2PenaltyArray.indexOf(itemObj.co2PenaltyValue) + 1, co2PenaltyValue: itemObj.co2PenaltyValue,
        },
      )
    }
    setRowData(tableRows)
  }

  useEffect(() => {
    getData('2023-06-19', 1);
  }, []);

  const defaultColDef = useMemo(() => {
    return {
      width: 100,
    };
  }, []);

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState([
    {
      headerName: '',
      children: [
        { field: 'teamName', type: 'team', cellStyle: { color: 'black', 'backgroundColor': '#F1F8C3', fontWeight: 'bold' }, filter: true },
      ]
    },
    {
      headerName: 'Scores',
      children: [
        { headerName: 'Rank', field: 'scoresRank', type: 'rank' },
        { headerName: 'Value', field: 'scoresValue', filter: 'agNumberColumnFilter' }
      ],
    },
    {
      headerName: 'WACC (%)',
      children: [
        { headerName: 'Rank', field: 'waccRank', type: 'rank' },
        { headerName: 'Value', field: 'waccValue', filter: 'agNumberColumnFilter' }
      ],
    },
    {
      headerName: 'Factory Utilisation (%)',
      children: [
        { headerName: 'Rank', field: 'factoryUtilisationRank', type: 'rank' },
        { headerName: 'Value', field: 'factoryUtilisationValue' }
      ],
    },
    {
      headerName: 'Employee Engagement (%)',
      children: [
        { headerName: 'Rank', field: 'employeeEngagementRank', type: 'rank' },
        { headerName: 'Value', field: 'employeeEngagementValue' }
      ],
    },
    {
      headerName: 'Interest Coverage (x X)',
      children: [
        { headerName: 'Rank', field: 'interestCoverageRank', type: 'rank' },
        { headerName: 'Value', field: 'interestCoverageValue' }
      ],
    },
    {
      headerName: 'Cumulative Market Spend/Rev (USD)',
      children: [
        { headerName: 'Rank', field: 'marketingSpendRevRank', type: 'rank' },
        { headerName: 'Value', field: 'marketingSpendRevValue', filter: 'agNumberColumnFilter' }
      ],
    },
    {
      headerName: 'eCar Sales (Units)',
      children: [
        { headerName: 'Rank', field: 'eCarsSalesRank', type: 'rank' },
        { headerName: 'Value', field: 'eCarsSalesValue', filter: 'agNumberColumnFilter' }
      ],
    },
    {
      headerName: 'C02 Penalty (USD)',
      children: [
        { headerName: 'Rank', field: 'co2PenaltyRank', type: 'rank' },
        { headerName: 'Value', field: 'co2PenaltyValue', filter: 'agNumberColumnFilter' }
      ],
    }
  ]);

  return (
    <div style={containerStyle}>
      <div>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {dayNo}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item value="2023-06-19" onClick={() => getData('2023-06-19', 1)}>Day 1</Dropdown.Item>
            <Dropdown.Item value="2023-06-20" onClick={() => getData('2023-06-20', 2)}>Day 2</Dropdown.Item>
            <Dropdown.Item value="2023-06-21" onClick={() => getData('2023-06-21', 3)}>Day 3</Dropdown.Item>
            <Dropdown.Item value="2023-06-23" onClick={() => getData('2023-06-23', 4)}>Day 4</Dropdown.Item>
            <Dropdown.Item value="2023-06-24" onClick={() => getData('2023-06-24', 5)}>Day 5</Dropdown.Item>
            <Dropdown.Item value="2023-06-25" onClick={() => getData('2023-06-25', 6)}>Day 6</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div
        style={gridStyle}
        className={
          "ag-theme-quartz"
        }
      >
        <AgGridReact
          columnTypes={columnTypes}
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
        />
      </div>
    </div>
  );
};

export default KpiDataTable