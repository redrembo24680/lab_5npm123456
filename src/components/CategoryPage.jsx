import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { vacanciesData } from '../data/vacancies';
import VacancyCard from './VacancyCard';

const CategoryPage = () => {
    const { name } = useParams();
    // Фільтрація вакансій за категорією (case-insensitive)
    const filteredVacancies = vacanciesData.filter(v =>
        v.title.toLowerCase().includes(name.toLowerCase()) ||
        v.description.toLowerCase().includes(name.toLowerCase())
    );

    return (
        <main className="category-main">
            <div className="category-container">
                <Link to="/" className="category-back-link">
                    ← Назад до всіх вакансій
                </Link>
                <h2 className="category-title">Напрямок: {name}</h2>
                {filteredVacancies.length > 0 ? (
                    <div className="vacancies-grid">
                        {filteredVacancies.map(v => (
                            <VacancyCard key={v.id} vacancy={v} />
                        ))}
                    </div>
                ) : (
                    <p className="category-empty">На жаль, у категорії "{name}" поки що немає відкритих вакансій.</p>
                )}
            </div>
        </main>
    );
};

export default CategoryPage;
