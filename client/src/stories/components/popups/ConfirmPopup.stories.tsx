import { Meta } from "@storybook/react";
import { ConfirmPopup } from "../../../components/popUps/ConfirmPopup";
import { ErrorProvider } from "../../../context/FeedbackContext";
import '../../../components/popUps/popUp.css'
export default {
    title: 'Components/PopUps/ConfirmPopup',
    component: ConfirmPopup,
    tags: ['autodocs']
} satisfies Meta<typeof ConfirmPopup>

export const DefaultPopup = () => {
    return (
        <ErrorProvider>
            <ConfirmPopup title="Default Confirm PopUp Title" cancel={()=>{}} proceed={()=>{}}/>
        </ErrorProvider>
    )
}