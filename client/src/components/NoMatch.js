import React from 'react'
import {useLocation, useHistory} from 'react-router-dom'

const NoMatch = () => {
    const location = useLocation();
    const history = useHistory();

    setTimeout(() => {
        history.push('/');
    }, 3000)

    return (
        <div className="no-match">
            <p>Sorry, the page you are looking for at the <span>{location.pathname}</span>, does not exist</p>
            
        </div>
    )
}

export default NoMatch
