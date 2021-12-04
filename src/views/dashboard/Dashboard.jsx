import React,{useState} from 'react'
import Login from '../pages/Login'
import HomeDashboard from './HomeDashboard'

function Dashboard() {
    const [token, setToken] = useState("")

    return (
        <>
            {token===""?<Login passToken={setToken} />:<HomeDashboard token={token}/>}
        </>
    )
}

export default Dashboard
