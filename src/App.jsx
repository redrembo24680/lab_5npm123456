import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Header from './components/Header';
import Hero from './components/Hero';
import Categories from './components/Categories';
import VacancyList from './components/VacancyList';
import HowItWorks from './components/HowItWorks';
import Profile from './components/Profile';
import CategoryPage from './components/CategoryPage';
import Auth from './components/Auth';
import Footer from './components/Footer';
import { vacanciesData } from './data/vacancies';

const App = () => {
    const [filteredVacancies, setFilteredVacancies] = useState(vacanciesData);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleSearch = (position, location) => {
        const queryPosition = position.trim().toLowerCase();
        const queryLocation = location.trim().toLowerCase();

        if (!queryPosition && !queryLocation) {
            setFilteredVacancies(vacanciesData);
            return;
        }

        const filtered = vacanciesData.filter(v => {
            const titleMatch = v.title.toLowerCase().includes(queryPosition) || 
                               v.description.toLowerCase().includes(queryPosition);
            const locationMatch = v.location.toLowerCase().includes(queryLocation) ||
                                  v.type.toLowerCase().includes(queryLocation);
            
            if (queryPosition && queryLocation) return titleMatch && locationMatch;
            return titleMatch || locationMatch;
        });

        setFilteredVacancies(filtered);
    };

    if (loading) return <div className="loading">Завантаження...</div>;

    return (
        <Router>
            <Header user={user} />
            <main>
                <Routes>
                    <Route path="/" element={
                        <>
                            <Hero onSearch={handleSearch} />
                            <Categories />
                            <VacancyList vacancies={filteredVacancies} />
                            <HowItWorks />
                        </>
                    } />
                    <Route 
                        path="/profile" 
                        element={user ? <Profile user={user} /> : <Navigate to="/auth" />} 
                    />
                    <Route path="/auth" element={!user ? <Auth /> : <Navigate to="/profile" />} />
                    <Route path="/category/:name" element={<CategoryPage />} />
                    <Route path="/categories" element={<Categories />} />
                </Routes>
            </main>
            <Footer />
        </Router>
    );
};

export default App;
