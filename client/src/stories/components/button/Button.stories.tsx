import { Meta } from "@storybook/react";
import { Button } from "../../../components/buttons/Button";
import { BUTTON_TYPES } from "../../../interfaces/common.interfaces";

export default {
    title: 'Components/Button',
    component: Button,
    tags: ['autodocs']
} satisfies Meta<typeof Button>

export const CustomButton = () => {
    return (
        <>
            <hr/>
            <Button 
                title="Primary Submit Button" 
                onClick={()=>{}} 
                type={BUTTON_TYPES.PRIMARY_SUBMIT}
            />
            <hr/>
            <Button 
                title="Primary Cancel Button" 
                onClick={()=>{}} 
                type={BUTTON_TYPES.PRIMARY_CANCEL}
            />
            <hr/>
            <Button 
                title="Secondary Submit Button" 
                onClick={()=>{}} 
                type={BUTTON_TYPES.SECONDARY_SUBMIT}
            />
            <hr/>
            <Button 
                title="Secondary Cancel Button" 
                onClick={()=>{}} 
                type={BUTTON_TYPES.SECONDARY_CANCEL}
            />
            <hr/>
        </>
    )
}