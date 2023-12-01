import { BrowserRouter } from "react-router-dom";
import { Card } from "../../../components/cards/Card";
import { Header } from "../../../components/header/Header";
import { AuthProvider } from "../../../context/AuthContext";
import { ErrorProvider } from "../../../context/FeedbackContext";
import { client } from "../../data/dummy";
import type { Meta, StoryObj } from '@storybook/react';


export default {
    title: 'Components/Header',
    component: Card,
    tags: ['autodocs']
} satisfies Meta<typeof Header>;

export const AuthorisedHeader = () => {
    return (
        <BrowserRouter>
            <AuthProvider defaultState={{user: client, isAuthenticated: true}}>
                <ErrorProvider>
                    <Header />
                </ErrorProvider>
            </AuthProvider>
        </BrowserRouter>
    )
}

export const UnauthorisedHeader = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <ErrorProvider>
                    <Header />
                </ErrorProvider>
            </AuthProvider>
        </BrowserRouter>
    )
}
