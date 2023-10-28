import { useState } from "react";


import { getApiUrl } from "../utils/helpers/general"
import { useFeedback } from "../context/FeedbackContext"
import { Job } from "../interfaces/contract.interfaces"

export const useJobs = (userId: number, removeJobFromList: (jobId: number) => void) => {
    const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
    const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
    const { addError, addSuccess } = useFeedback();

    const onShowConfirmation = (job: Job) => {
        setShowConfirmation(true);
        setSelectedJobId(job.id);
    }

    const cancelPayment = () => {
        setSelectedJobId(null);
        setShowConfirmation(false);
    }

    const handleConfirm = () => {
        if (userId) return;
        setShowConfirmation(false);
        const header = new Headers();
        header.append('profile_id', String(userId));
        header.append("Content-Type", 'application/json');
        fetch(getApiUrl(`jobs/${selectedJobId}/pay`), {
            headers: header,
            method: "POST"
        })
            .then(res => res.json())
            .then((res: { ok: boolean, error?: { message: string } }) => {
                if (res.ok) {
                    if (selectedJobId) {
                        removeJobFromList(selectedJobId);
                        addSuccess('You successfully payed the job!')
                    }
                } else if (res.error) {
                    addError(res.error.message);
                }
                setSelectedJobId(null);
            })
            .catch(err => {
                addError('Something went wrong, try again later!');
            })
    }

    return {
        handleConfirm,
        onShowConfirmation,
        showConfirmation,
        cancelPayment,
    }
}