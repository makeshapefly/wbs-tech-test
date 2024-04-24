import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AgChartsReact } from 'ag-charts-react';
import { auth } from '../auth/config'
import { useNavigate } from 'react-router-dom'
import "../styles/styles.css";


const KpiLineChart = ({ user }) => {
    const TEAM_NAMES = ["fovro", "Fastun", "Nyxx", "CarSpa", "Motion", "Worthwheel", "Carzio", "Rollovo", "iAuto", "VroomTime", "Kar", "EliteTechs", "Carz", "MileMode", "Automotiq", "RYDI", "EvolutionAuto", "Automovo", "ROBOH", "rimovo", "ottobi", "Evi", "Rusted", "Cjio", "NitroRide", "HXH", "SpeedLabs", "TenQ", "Caraxa", "Blazers", "DriveSwitch", "GIIQ", "Teuso", "Hoqa", "AutoInfinite", "vusk", "DentCenter", "Turbo", "evCU", "Electronically", "Drivat", "Torque", "Drift", "Carvato", "Rush", "Matic", "Wheelic", "Slidyn", "Pitpo", "caralo", "Drivesly", "Xuad", "CarLeap", "Tazox", "Amxu", "Honkli"];
    const navigate = useNavigate();
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        let currentUser = auth.currentUser
        if (currentUser != null) {
            getData()
        } else {
            navigate("/");
        }
    }, [])

    const getData = () => {
        //let waccSet, factoryUtilizationSet, scoresSet, employeeEngagementSet, interestCoverageSet, marketingSpendRevSet, eCarsSalesSet, co2PenaltySet = []
        //get team
        let teamNo = TEAM_NAMES.indexOf(user.team) + 1
        getTeamData(teamNo)
    }
    const getTeamData = (team) => {
        fetch(process.env.REACT_APP_HOST_IP_ADDRESS_TEAM_DATA + team, {
            method: 'GET',
            headers: {
                'Api-key': process.env.REACT_APP_API_KEY,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                transformData(data);
            });
    }

    const transformData = (data) => {
        let plotDates = ['2023-06-19', '2023-06-20', '2023-06-21', '2023-06-23', '2023-06-24', '2023-06-25']
        let array = []
        for (let i in data.wacc) {
            array.push(
                {
                    day: plotDates[i],
                    scores: parseFloat(data.scores[i]),
                    wacc: parseFloat(data.wacc[i]),
                    factory_utilisation: parseInt(data.factory_utilization[i]),
                    employee_engagement: parseFloat(data.employee_engagement[i]),
                    interest_coverage: parseInt(data.interest_coverage[i]),
                    cumulative_market_spend_rev: parseFloat(data.marketing_spend_rev[i]),
                    e_car_sales: parseInt(data.e_cars_sales[i]),
                    co2_penalty: parseFloat(data.co2_penalty[i])
                }
            )
        }
        setChartData(array)
    }

    const options = {
        container: document.getElementById("myChart"),
        data: chartData,
        title: {
            text: "KPI values across the week for Team " + user.team,
        },
        footnote: {
            text: "Source: Business in Practice Data 2023",
        },
        series: [
            {
                type: "line",
                xKey: "day",
                yKey: "scores",
                yName: "Scores",
            },
            {
                type: "line",
                xKey: "day",
                yKey: "wacc",
                yName: "WACC",
                visible: false
            },
            {
                type: "line",
                xKey: "day",
                yKey: "factory_utilisation",
                yName: "Factory Utilisation",
                visible: false
            },
            {
                type: "line",
                xKey: "day",
                yKey: "employee_engagement",
                yName: "Employee Engagement",
                visible: false
            },
            {
                type: "line",
                xKey: "day",
                yKey: "interest_coverage",
                yName: "Interest Coverage",
                visible: false
            },
            {
                type: "line",
                xKey: "day",
                yKey: "cumulative_market_spend_rev",
                yName: "Cumulative Market Spend Rev (USD)",
                visible: false
            },
            {
                type: "line",
                xKey: "day",
                yKey: "e_car_sales",
                yName: "eCar Sales (Units)",
                visible: false
            },
            {
                type: "line",
                xKey: "day",
                yKey: "co2_penalty",
                yName: "CO2 Penalty (USD)",
                visible: false
            },
        ],
    }

    return <AgChartsReact options={options} />

}

export default KpiLineChart