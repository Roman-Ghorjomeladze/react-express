import { useState } from "react";


import { useFeedback } from "../context/FeedbackContext";
import { getApiUrl, getJsonHeader } from "../utils/helpers/general";
import { User } from "../interfaces/user.interfaces";

export const useDeposite = (updateUserBalance: (balance: number) => void, userId?: number) => {
    const [showDepositPopup, setShowDepositPopup] = useState<boolean>(false);
    const { addError, addSuccess } = useFeedback()

    const handleDeposit = (): void => {
        setShowDepositPopup(true);
    }

    const confirmDeposit = async (amount: number): Promise<void> => {
        setShowDepositPopup(false);
        fetch(getApiUrl(`balance/deposit/${userId}`), {
            headers: getJsonHeader(userId),
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
    }
    return {
        cancelDeposit,
        handleDeposit,
        showDepositPopup,
        confirmDeposit,
    }
}