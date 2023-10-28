import { Meta } from "@storybook/react";
import { ConfirmPopup } from "../../../components/popUps/ConfirmPopup";
import { ErrorProvider } from "../../../context/FeedbackContext";
import '../../../components/popUps/popUp.css'
import { DepositPopup } from "../../../components/popUps/DepositPopup";
export default {
    title: 'Components/PopUps/DepositPopup',
    component: DepositPopup,
    tags: ['autodocs']
} satisfies Meta<typeof ConfirmPopup>

export const DefaultPopup = () => {
    return (
        <ErrorProvider>
            <DepositPopup cancel={()=>{}} proceed={()=>{}}/>
        </ErrorProvider>
    )
}