import { useEffect, useState } from "react"


import { getApiUrl } from "../../utils/helpers/general";
import { useAuth } from "../../context/AuthContext"
import { Contract, Job } from "../../interfaces/contract.interfaces";
import { Contracts } from "../../views/contracts/Contracts";
import { Jobs } from "../../views/jobs/Jobs";
import { useFeedback } from "../../context/FeedbackContext";
import './dashboard.css'


export const Dashboard = () => {
    const {user, isClient, updateUserBalance} = useAuth();
    const [contracts, setContracts] = useState<Contract[]>([]);
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loadingContacts, setLoadingContacts] = useState<boolean>(true)
    const [loadingJobs, setLoadingJobs] = useState<boolean>(true)
    const {addError} = useFeedback();

    useEffect(() => {
        fetch(getApiUrl('contracts'), {headers: {profile_id: String(user?.id)}})
        .then(res => res.json())
        .then((json: {data: Contract[],  ok: boolean, error: {message: string}}) => {
            if (json.ok) {
                setContracts(json.data);
            } else if (json.error) {
                addError(json.error.message)
            }
        })
        .catch(err => {
            addError("Something went wrong, couldn't load resources.")
        })
        .finally(() => {
            setLoadingContacts(false)
        })

        fetch(getApiUrl('jobs/unpaid'), {headers: {profile_id: String(user?.id)}})
        .then(res => res.json())
        .then((json: {data: Job[], ok: boolean, error: {message: string}}) => {
            if (json.ok) {
                setJobs(json.data)
            } else if (json.error) {
                addError(json.error.message);
            }
        })
        .catch(err => {
            addError("Something went wrong, couldn't load resources.")
        })
        .finally(() => {
            setLoadingJobs(false)
        })
    }, [])

    const removeJobFromList = (jobId: number) => {
        setJobs(prev => prev.filter(j => j.id !== jobId))
    }

    return <div className="dashboard">
        {!loadingContacts && user && (
            <Contracts 
                isClient={isClient} 
                user={user} 
                updateUserBalance={updateUserBalance} 
                data={contracts}
            />
        )}
        {!loadingJobs && user && (
            <Jobs 
                isClient={isClient} 
                user={user} 
                removeJobFromList={removeJobFromList} 
                data={jobs}
            />
        )}
    </div>
}