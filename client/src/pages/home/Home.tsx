import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


import { User } from '../../interfaces/user.interfaces';
import { useAuth } from '../../context/AuthContext';
import { getApiUrl } from '../../utils/helpers/general';
import './home.css';
import { useFeedback } from '../../context/FeedbackContext';


export const Home = () => {
    const [users, setUsers] = useState<User[]>([]);
    const naviagate = useNavigate();
    const {login} = useAuth();
    const {addError} = useFeedback();

    useEffect(() => {
        fetch(getApiUrl('users'), {
            headers: {profile_id: '1'}
        })
        .then(res => res.json())
        .then((jsonResponse: {data: User[], ok: boolean, error: {message: string}}) => {
            if (jsonResponse.ok) {
                setUsers(jsonResponse.data);
            } else if (jsonResponse.error) {
                addError(jsonResponse.error.message)
            }
        })
        .catch(err => {
            addError("Something went wrong, couldn't load resources")
        })
    }, [])

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const profile = users.find(user => user.id === Number(e.target.value));
        if (profile) {
            login(profile);
            naviagate('/dashboard');
        }
    }
    
    return (
        <div className='home'>
            <div className='flexContainer'>
                <h2>Select user to Sign In</h2>
                <select onChange={handleChange} className='select' name='users' id='users'>
                    {
                        users.map(user => <option key={user.id} value={user.id}>{user.type}: {user.firstName} {user.lastName} </option>)
                    }
                </select>
            </div>
        </div>
    )
}