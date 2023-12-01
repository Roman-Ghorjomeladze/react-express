import { useState, useEffect } from "react";
import { useFeedback } from "../context/FeedbackContext";
import { Contract, Job } from "../interfaces/contract.interfaces";
import { getApiUrl } from "../utils/helpers/general";
import { User } from "../interfaces/user.interfaces";
import { PAYMENT_TYPE } from "../utils/types/job";
import { CandidateSelect } from "../utils/types/dashboard";

export const useDashboard = (user: User|null) => {
    const [contracts, setContracts] = useState<Contract[]>([]);
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loadingContacts, setLoadingContacts] = useState<boolean>(true);
    const [loadingJobs, setLoadingJobs] = useState<boolean>(true);
    const [selectedCandidate, setSelectedCandidate] = useState<CandidateSelect|null>(null)
    const {addError} = useFeedback();
    const [paymentFilter, setPaymentFilter] = useState<PAYMENT_TYPE>(PAYMENT_TYPE.ALL)

    useEffect(() => {
        const query = new URLSearchParams({});
        if (selectedCandidate?.id) {
            query.append('contractorId', String(selectedCandidate.id))
        }
        fetch(getApiUrl("contracts?")+query.toString(), { headers: { profile_id: String(user?.id) },  })
            .then((res) => res.json())
            .then(
                (json: {
                    data: Contract[];
                    ok: boolean;
                    error: { message: string };
                }) => {
                    if (json.ok) {
                        setContracts(json.data);
                    } else if (json.error) {
                        addError(json.error.message);
                    }
                }
            )
            .catch((err) => {
                addError("Something went wrong, couldn't load resources.");
            })
            .finally(() => {
                setLoadingContacts(false);
            });
        const params = new URLSearchParams({});
        if (paymentFilter !== PAYMENT_TYPE.ALL) {
            params.append('paid', String(Number(paymentFilter === PAYMENT_TYPE.PAID)))
        }
        if (selectedCandidate?.id) {
            params.append('contractorId', String(selectedCandidate.id))
        }
        fetch(getApiUrl("jobs?")+params.toString(), {
            headers: { profile_id: String(user?.id) },
        })
            .then((res) => res.json())
            .then(
                (json: { data: Job[]; ok: boolean; error: { message: string } }) => {
                    if (json.ok) {
                        setJobs(json.data);
                    } else if (json.error) {
                        addError(json.error.message);
                    }
                }
            )
            .catch((err) => {
                addError("Something went wrong, couldn't load resources.");
            })
            .finally(() => {
                setLoadingJobs(false);
            });
    }, [paymentFilter, selectedCandidate]);

    const removeJobFromList = (jobId: number) => {
        setJobs((prev) => prev.filter((j) => j.id !== jobId));
    };

    const updatePaymentsFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        const paymentType: PAYMENT_TYPE = e.target.value as PAYMENT_TYPE;
        setPaymentFilter(prev => prev === paymentType ? PAYMENT_TYPE.ALL : paymentType);
    }

    const selectCandidate = (candidate: CandidateSelect) => {
        setSelectedCandidate(candidate || null)
    }

    const resetSelectedCandidate = () => {
        setSelectedCandidate(null);
    }

    return {removeJobFromList, contracts, jobs, loadingContacts, loadingJobs, updatePaymentsFilter, paymentFilter, selectCandidate, selectedCandidate, resetSelectedCandidate}
}