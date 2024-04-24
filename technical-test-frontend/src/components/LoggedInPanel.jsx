import React from 'react'

const LoggedInPanel = ({user}) => {
    let text = 'Not Logged In'
    let teamText = ''
    
    if (user != null && user != '') {
        text = `Hello, ${user.first_name} ${user.last_name} | ${user.role}`
        teamText = user.team != null ? `(Team ${user.team})` : ''
    }
    return (
        <div style={{fontSize: 18}}>{text} <b>{teamText}</b></div>
    )
}

export default LoggedInPanel