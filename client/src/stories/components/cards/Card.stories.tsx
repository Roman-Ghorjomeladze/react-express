import { Meta } from "@storybook/react";
import { Card } from "../../../components/cards/Card";
import { ErrorProvider } from "../../../context/FeedbackContext";

export default {
    title: 'Components/Card',
    component: Card,
    tags: ['autodocs']
} satisfies Meta<typeof Card>;

export const ClientCard = () => {
    return <ErrorProvider>
        <Card key='1' title="Top Client" client={{name: 'John Doe', totalCost: 500}}/>
    </ErrorProvider>
}

export const ProfessionCard = () => {
    return <ErrorProvider>
        <Card key='1' title="Top Profession" profession={{profession: 'Programmer', amount: 1500}}/>
    </ErrorProvider>
}
