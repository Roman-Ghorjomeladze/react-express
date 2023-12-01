import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import './searchSelect.css';
import { useDebounce } from '../../hooks/useDebounce';
import { getApiUrl, getJsonHeader } from '../../utils/helpers/general';
import { useAuth } from '../../context/AuthContext';
import { HTTPResponse } from '../../utils/types/general';
import { User } from '../../interfaces/user.interfaces';
import { useOutsideClick } from '../../hooks/useOutsideClick';

export const SearchSelect = ({handleSelect}: {handleSelect: (candiate: {id: number, name: string})=>void}) => {
    const [showDrop, setShowDrop] = useState<boolean>(false);
    const {user} = useAuth();
    const [list, setList] = useState<{id: number, name: string}[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>('');
    const debouncedSearch = useDebounce(searchValue);
    const selectRef = useOutsideClick(() => {
        setShowDrop(false)
    });

    const focus = () => {
        setShowDrop(true);
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
    }

    const onSelect = (record: {id: number, name: string}) => {
        handleSelect(record);
        setShowDrop(false);
    }

    useEffect(() => {
        const query = '?' + new URLSearchParams({myContractors: '1', search: searchValue}).toString();
        fetch(getApiUrl('user/profiles')+query, {headers: getJsonHeader(user?.id)})
        .then(res => res.json())
        .then((json: HTTPResponse) => {
            if (json.ok) {
                const users: User[] = json.data as User[];
                setList(users.map(u => ({
                    id: u.id, 
                    name: `${u.firstName} ${u.lastName}`
                })    
            ))}
        })
        .catch(err => {})
        .finally(() => {
        })
    }, [debouncedSearch])
    return <div ref={selectRef} className="searchSelect">
        <input
            onFocus={focus} 
            placeholder='Search...'
            value={searchValue}
            onChange={handleChange}
        />        
        {
            showDrop &&     
            <ul>
                {
                    loading && <li>Loading...</li>
                }
                {
                    !loading && list.length>0 && list.map((item) => <li onClick={() => onSelect(item)} className='resultItem' key={item.id}>{item.name}</li>)
                }
                {
                    !loading && list.length === 0 && <li>Nothing found...</li>
                }
            </ul>
        }
    </div>
}
<li>one</li>