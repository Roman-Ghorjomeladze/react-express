import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


import { User } from '../../interfaces/user.interfaces';
import { useAuth } from '../../context/AuthContext';
import { getApiUrl } from '../../utils/helpers/general';
import './home.css';
import { useFeedback } from '../../context/FeedbackContext';


export const Home = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const naviagate = useNavigate();
    const {login} = useAuth();
    const {addError, addWarning} = useFeedback();

    useEffect(() => {
        fetch(getApiUrl('user/profiles'), {
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
        setSelectedUserId(Number(e.target.value));
    }

    const onLogIn = () => {
        const profile = users.find(user => user.id === Number(selectedUserId));
        if (profile) {
            login(profile);
            naviagate('/dashboard');
        } else {
            addWarning('Pick up user to log in')
        }
    }
    
    return (
        <div className='home'>
            <div className='flexContainer'>
                <h2>Select user to Sign In</h2>
                <select onChange={handleChange} className='select' name='users' id='users'>
                    <option key={0} value={0}>pick up profile </option>
                    {
                        users.map(user => <option key={user.id} value={user.id}>{user.type}: {user.firstName} {user.lastName} </option>)
                    }
                </select>
                <button onClick={onLogIn} className='logInBtn'>Log In</button>
            </div>
        </div>
    )
}