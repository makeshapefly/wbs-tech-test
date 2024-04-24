import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { useNavigate } from 'react-router-dom'
import { auth } from '../auth/config'
import "../styles/styles.css";


const KpiSummaryTable = ({ user }) => {
    const TEAM_NAMES = ["fovro", "Fastun", "Nyxx", "CarSpa", "Motion", "Worthwheel", "Carzio", "Rollovo", "iAuto", "VroomTime", "Kar", "EliteTechs", "Carz", "MileMode", "Automotiq", "RYDI", "EvolutionAuto", "Automovo", "ROBOH", "rimovo", "ottobi", "Evi", "Rusted", "Cjio", "NitroRide", "HXH", "SpeedLabs", "TenQ", "Caraxa", "Blazers", "DriveSwitch", "GIIQ", "Teuso", "Hoqa", "AutoInfinite", "vusk", "DentCenter", "Turbo", "evCU", "Electronically", "Drivat", "Torque", "Drift", "Carvato", "Rush", "Matic", "Wheelic", "Slidyn", "Pitpo", "caralo", "Drivesly", "Xuad", "CarLeap", "Tazox", "Amxu", "Honkli"];
    const navigate = useNavigate();
    const [tableData, setTableData] = useState();

    useEffect(() => {
        let currentUser = auth.currentUser
        if (currentUser != null) {
            getData()
        } else {
            navigate("/");
        }
    }, [])

    const getData = () => {
        //get team
        let teamNo = TEAM_NAMES.indexOf(user.team) + 1
        getTeamData(teamNo)
    }
    const getTeamData = (team) => {
        fetch(process.env.REACT_APP_HOST_IP_ADDRESS_RANK_TEAM_DATA + team, {
            method: 'GET',
            headers: {
                'Api-key': process.env.REACT_APP_API_KEY,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setTableData(data)
                transformData(data);
            });
    }

    function getAverage(array) {
        let sum = 0;
        for (let i = 0; i < array.length; i++) {
            sum += array[i];
        }
        return (sum / array.length).toFixed(1)
    }

    const transformData = (data) => {
        console.log(getAverage(data.scores))
    }

    return (
        <div style={{ padding: 20 }}>
            <p>Summary Results for Team {user.team}</p>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>KPI</th>
                        <th>2023-06-19</th>
                        <th>2023-06-20</th>
                        <th>2023-06-21</th>
                        <th>2023-06-23</th>
                        <th>2023-06-24</th>
                        <th>2023-06-25</th>
                        <th>Mean Rank</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Scores</td>
                        <td>{tableData && tableData.scores[0]}</td>
                        <td>{tableData && tableData.scores[1]}</td>
                        <td>{tableData && tableData.scores[2]}</td>
                        <td>{tableData && tableData.scores[3]}</td>
                        <td>{tableData && tableData.scores[4]}</td>
                        <td>{tableData && tableData.scores[5]}</td>
                        <td>{tableData && getAverage(tableData.scores)}</td>
                    </tr>
                    <tr>
                        <td>WACC (%)</td>
                        <td>{tableData && tableData.wacc[0]}</td>
                        <td>{tableData && tableData.wacc[1]}</td>
                        <td>{tableData && tableData.wacc[2]}</td>
                        <td>{tableData && tableData.wacc[3]}</td>
                        <td>{tableData && tableData.wacc[4]}</td>
                        <td>{tableData && tableData.wacc[5]}</td>
                        <td>{tableData && getAverage(tableData.wacc)}</td>
                    </tr>
                    <tr>
                        <td>Factory Utilisation (%)</td>
                        <td>{tableData && tableData.factory_utilization[0]}</td>
                        <td>{tableData && tableData.factory_utilization[1]}</td>
                        <td>{tableData && tableData.factory_utilization[2]}</td>
                        <td>{tableData && tableData.factory_utilization[3]}</td>
                        <td>{tableData && tableData.factory_utilization[4]}</td>
                        <td>{tableData && tableData.factory_utilization[5]}</td>
                        <td>{tableData && getAverage(tableData.factory_utilization)}</td>
                    </tr>
                    <tr>
                        <td>Employee Engagement (%)</td>
                        <td>{tableData && tableData.employee_engagement[0]}</td>
                        <td>{tableData && tableData.employee_engagement[1]}</td>
                        <td>{tableData && tableData.employee_engagement[2]}</td>
                        <td>{tableData && tableData.employee_engagement[3]}</td>
                        <td>{tableData && tableData.employee_engagement[4]}</td>
                        <td>{tableData && tableData.employee_engagement[5]}</td>
                        <td>{tableData && getAverage(tableData.employee_engagement)}</td>
                    </tr>
                    <tr>
                        <td>Interest Coverage (x X)</td>
                        <td>{tableData && tableData.interest_coverage[0]}</td>
                        <td>{tableData && tableData.interest_coverage[1]}</td>
                        <td>{tableData && tableData.interest_coverage[2]}</td>
                        <td>{tableData && tableData.interest_coverage[3]}</td>
                        <td>{tableData && tableData.interest_coverage[4]}</td>
                        <td>{tableData && tableData.interest_coverage[5]}</td>
                        <td>{tableData && getAverage(tableData.interest_coverage)}</td>
                    </tr>
                    <tr>
                        <td>Cumulative Marketing Spend/Rev (USD) (%)</td>
                        <td>{tableData && tableData.marketing_spend_rev[0]}</td>
                        <td>{tableData && tableData.marketing_spend_rev[1]}</td>
                        <td>{tableData && tableData.marketing_spend_rev[2]}</td>
                        <td>{tableData && tableData.marketing_spend_rev[3]}</td>
                        <td>{tableData && tableData.marketing_spend_rev[4]}</td>
                        <td>{tableData && tableData.marketing_spend_rev[5]}</td>
                        <td>{tableData && getAverage(tableData.marketing_spend_rev)}</td>
                    </tr>
                    <tr>
                        <td>eCar Sales (Units)</td>
                        <td>{tableData && tableData.ecar_sales[0]}</td>
                        <td>{tableData && tableData.ecar_sales[1]}</td>
                        <td>{tableData && tableData.ecar_sales[2]}</td>
                        <td>{tableData && tableData.ecar_sales[3]}</td>
                        <td>{tableData && tableData.ecar_sales[4]}</td>
                        <td>{tableData && tableData.ecar_sales[5]}</td>
                        <td>{tableData && getAverage(tableData.ecar_sales)}</td>
                    </tr>
                    <tr>
                        <td>CO2 Penalty (USD)</td>
                        <td>{tableData && tableData.co2_penalty[0]}</td>
                        <td>{tableData && tableData.co2_penalty[1]}</td>
                        <td>{tableData && tableData.co2_penalty[2]}</td>
                        <td>{tableData && tableData.co2_penalty[3]}</td>
                        <td>{tableData && tableData.co2_penalty[4]}</td>
                        <td>{tableData && tableData.co2_penalty[5]}</td>
                        <td>{tableData && getAverage(tableData.co2_penalty)}</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default KpiSummaryTable