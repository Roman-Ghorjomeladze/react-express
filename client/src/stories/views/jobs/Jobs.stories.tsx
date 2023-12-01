import { ErrorProvider } from "../../../context/FeedbackContext";
import { client, contractor, jobs } from "../../data/dummy";
import '../../../pages/dashboard/dashboard.css'
import { Jobs } from "../../../views/jobs/Jobs";
import { Meta } from "@storybook/react";

export default {
    title: 'Views/Jobs',
    component: Jobs,
    tags: ['autodocs']
} satisfies Meta<typeof Jobs>

export const clientViewWithoutData = () => {
    return (
        <ErrorProvider>
            <Jobs 
                data={[]}
                isClient={true}
                user={client}
                removeJobFromList={()=>{}}
                selectedCandidate={null}
                resetSelectedCandidate={()=>{}}
            />
        </ErrorProvider>
    )
}
export const clientViewWithData = () => {
    return (
        <ErrorProvider>
            <Jobs 
                data={jobs}
                isClient={true}
                user={client}
                removeJobFromList={()=>{}}
                selectedCandidate={null}
                resetSelectedCandidate={()=>{}}
            />
        </ErrorProvider>
    )
}

export const ContractorViewWithoutData = () => {
    return (
        <ErrorProvider>
            <Jobs 
                data={[]}
                isClient={false}
                user={contractor}
                removeJobFromList={()=>{}}
                selectedCandidate={null}
                resetSelectedCandidate={()=>{}}
            />
        </ErrorProvider>
    )
}
export const ContractorViewWithData = () => {
    return (
        <ErrorProvider>
            <Jobs 
                data={jobs}
                isClient={false}
                user={contractor}
                removeJobFromList={()=>{}}
                selectedCandidate={null}
                resetSelectedCandidate={()=>{}}
            />
        </ErrorProvider>
    )
}