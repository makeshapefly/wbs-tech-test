import React, { useMemo } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import "../styles/styles.css";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import KpiSummaryTable from './KpiSummaryTable';
import KpiDataTable from './KpiDataTable';
import KpiLineChart from './KpiLineChart';

const Dashboard = ({ user }) => {
    const containerStyle = useMemo(() => ({ margin: 20 }), []);

    if (user && user.role == 'student') {
        return (
            <div style={containerStyle}>
                <h1>KPI Dashboard</h1>
                <Row>
                    <Col>
                        <div>{user && <KpiSummaryTable user={user} />}</div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div style={{ padding: 30, background: '#dee2e6' }}><KpiLineChart user={user} /></div>
                    </Col>
                </Row>
                <Row>
                    <KpiDataTable user={user} />
                </Row>
            </div>
        )
    }

    if (user && user.role == 'Support Staff') {
        return (
            <div style={containerStyle}>
                <h1>KPI Dashboard</h1>
                <Row>
                    <KpiDataTable user={user} />
                </Row>
            </div>
        )
    }
}

export default Dashboard