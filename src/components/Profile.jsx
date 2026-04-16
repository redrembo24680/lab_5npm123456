import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const Profile = ({ user }) => {
    const [profileData, setProfileData] = useState({
        name: user.email.split('@')[0],
        role: 'Junior Web Developer',
        location: '📍 м. Львів',
        status: 'Шукаю роботу',
        skills: 'HTML5, CSS3, JavaScript, React, Git'
    });
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const docRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setProfileData(docSnap.data());
                }
            } catch (err) {
                console.error("Помилка при завантаженні профілю:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [user.uid]);

    const handleSave = async () => {
        try {
            await setDoc(doc(db, 'users', user.uid), profileData);
            setIsEditing(false);
            alert('Профіль успішно збережено!');
        } catch (err) {
            alert('Помилка при збереженні: ' + err.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({ ...prev, [name]: value }));
    };

    if (loading) return <section className="container"><h2>Завантаження...</h2></section>;
    if (error) return <section className="container"><h2 className="error-msg">Помилка бази даних: {error}</h2><p>Переконайтеся, що ви створили Firestore Database у консолі Firebase.</p></section>;

    return (
        <section id="profile" className="container">
            <h2>Мій профіль</h2>
            <div className="profile-card">
                <div className="avatar-placeholder">{profileData.name[0].toUpperCase()}</div>
                <div className="details">
                    {isEditing ? (
                        <div className="edit-form">
                            <input name="name" value={profileData.name} onChange={handleChange} placeholder="Ім'я" />
                            <input name="role" value={profileData.role} onChange={handleChange} placeholder="Посада" />
                            <input name="location" value={profileData.location} onChange={handleChange} placeholder="Локація" />
                            <input name="status" value={profileData.status} onChange={handleChange} placeholder="Статус" />
                            <textarea name="skills" value={profileData.skills} onChange={handleChange} placeholder="Навички (через кому)" />
                            <div className="profile-actions">
                                <button className="resume-btn" onClick={handleSave}>Зберегти</button>
                                <button className="edit-btn" onClick={() => setIsEditing(false)}>Скасувати</button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="profile-header">
                                <h3>{profileData.name}</h3>
                                <span className="badge status">{profileData.status}</span>
                            </div>
                            <p className="location">📍 {profileData.location.replace('📍 ', '')}</p>
                            <p className="role"><strong>Бажана посада:</strong> {profileData.role}</p>
                            
                            <div className="progress-container">
                                <p>Заповненість профілю: 100%</p>
                                <div className="progress-bar"><div className="progress" style={{ width: '100%' }}></div></div>
                            </div>

                            <div className="skills">
                                {profileData.skills.split(',').map(skill => (
                                    <span key={skill} className="skill-tag">{skill.trim()}</span>
                                ))}
                            </div>
                            
                            <div className="profile-actions">
                                <button className="resume-btn" onClick={() => alert('Почалося завантаження вашого CV...')}>
                                    Завантажити CV
                                </button>
                                <button className="edit-btn" onClick={() => setIsEditing(true)}>
                                    Редагувати профіль
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Profile;
