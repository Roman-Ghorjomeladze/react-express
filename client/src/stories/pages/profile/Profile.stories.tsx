import { Meta } from "@storybook/react";
import { Profile } from "../../../pages/profile/Profile";
import { AuthProvider } from "../../../context/AuthContext";
import { ErrorProvider } from "../../../context/FeedbackContext";
import { client } from "../../data/dummy";
import '../../../pages/profile/profile.css';

export default {
    title: 'Pages/Profile',
    component: Profile,
    tags: ['autodocs']
} satisfies Meta<typeof Profile>

export const Page = () => {
    return (
        <AuthProvider defaultState={{user: client, isAuthenticated: true, isClient: true}}>
            <ErrorProvider>
                <Profile/>
            </ErrorProvider>
        </AuthProvider>
    )
}