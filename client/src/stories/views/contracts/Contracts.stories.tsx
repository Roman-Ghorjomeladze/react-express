import React from "react";
import { Contracts } from "../../../views/contracts/Contracts";
import { ErrorProvider } from "../../../context/FeedbackContext";
import { client, contractor, contracts } from "../../data/dummy";
import '../../../pages/dashboard/dashboard.css'
import { Meta } from "@storybook/react";

export default {
    title: 'Views/Contracts',
    component: Contracts,
    tags: ['autodocs'],
    args: {
        isClient: false,
        user: client
    }
} satisfies Meta<typeof Contracts>

export const clientViewWithoutData = () => {
    return (
        <ErrorProvider>
            <Contracts 
                data={[]}
                isClient={true}
                updateUserBalance={(balance)=>{}}
                user={client}
            />
        </ErrorProvider>
    )
}
export const clientViewWithData = () => {
    return (
        <ErrorProvider>
            <Contracts 
                data={contracts}
                isClient={true}
                updateUserBalance={(balance)=>{}}
                user={client}
            />
        </ErrorProvider>
    )
}

export const ContractorViewWithoutData = () => {
    return (
        <ErrorProvider>
            <Contracts 
                data={[]}
                isClient={true}
                updateUserBalance={(balance)=>{}}
                user={contractor}
            />
        </ErrorProvider>
    )
}
export const ContractorViewWithData = () => {
    return (
        <ErrorProvider>
            <Contracts 
                data={contracts}
                isClient={true}
                updateUserBalance={(balance)=>{}}
                user={contractor}
            />
        </ErrorProvider>
    )
}