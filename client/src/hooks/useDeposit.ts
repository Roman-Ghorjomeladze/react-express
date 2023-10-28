import { useState } from "react";


import { useFeedback } from "../context/FeedbackContext";
import { Contract } from "../interfaces/contract.interfaces";
import { getApiUrl } from "../utils/helpers/general";
import { User } from "../interfaces/user.interfaces";

export const useDeposite = (userId: number, updateUserBalance: (balance: number) => void) => {
    const [selectedCandidateId, setSelectedCandidateId] = useState<number | null>(null);
    const [showDepositPopup, setShowDepositPopup] = useState<boolean>(false);
    const { addError, addSuccess } = useFeedback()

    const handleDeposit = (contract: Contract): void => {
        setSelectedCandidateId(contract.ContractorId);
        setShowDepositPopup(true);
    }

    const confirmDeposit = async (amount: number): Promise<void> => {
        setShowDepositPopup(false);
        setSelectedCandidateId(null);
        const header = new Headers();
        header.append('profile_id', String(userId));
        header.append("Content-Type", 'application/json');
        fetch(getApiUrl(`balance/deposit/${selectedCandidateId}`), {
            headers: header,
            body: JSON.stringify({ depositAmount: amount }),
            method: "POST"
        })
            .then(res => res.json())
            .then((res: { ok: boolean, data?: User, error?: { message: string } }) => {
                if (res.ok && res.data) {
                    updateUserBalance(res.data.balance);
                    addSuccess(`You depositted successfully ${amount}$`)
                } else if (res.error) {
                    addError(res.error.message);
                }
            })
            .catch(err => {
                addError('Something went wrong, try again later!');
            })
    }

    const cancelDeposit = (): void => {
        setShowDepositPopup(false);
        setSelectedCandidateId(null);
    }
    return {
        cancelDeposit,
        handleDeposit,
        showDepositPopup,
        confirmDeposit,
    }
}