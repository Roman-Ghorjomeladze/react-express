import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/home/Home';
import { Dashboard } from './pages/dashboard/Dashboard';
import { Header } from './components/header/Header';
import { AuthProvider } from './context/AuthContext';
import { Layout } from './components/layout/Layout';
import { AdminPage } from './pages/admin/Admin';
import { PageNotFound } from './pages/404/PageNotFound';
import { Profile } from './pages/profile/Profile';
import { ErrorProvider } from './context/FeedbackContext';
import ErrorComponent from './components/feedback/Feedback';


const App = () => {

  return (
    <BrowserRouter basename='/'>
      <AuthProvider>
          <ErrorProvider>
            <Layout>
              <Header/>
              <Routes>
                <Route  path='/' element={<Home/>}/>
                <Route  path='/dashboard' element={<Dashboard/>}/>
                <Route  path='/profile' element={<Profile/>}/>
                <Route  path='/admin' element={<AdminPage/>}/>
                <Route  path='/*' element={<PageNotFound/>}/>
              </Routes>
            </Layout>
            <ErrorComponent/>
          </ErrorProvider>
      </AuthProvider>
    </BrowserRouter>

  )
}

export default App;
