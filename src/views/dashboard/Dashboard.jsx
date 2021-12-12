import React,{useState,useEffect} from 'react'
import { getTokenLocal } from '../../../utils/auth'
import Login from '../pages/Login'
import HomeDashboard from './HomeDashboard'
function Dashboard() {
    const [user, setUser] = useState(false);
    useEffect(() => {
		if (getTokenLocal()) {
            setUser(true);
				return;
            }
    }, []);

    return (
        <>
            {user?<HomeDashboard />:<Login setUser={setUser}/>}
        </>
    )
}

export default Dashboard
