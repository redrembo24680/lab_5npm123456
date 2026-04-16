import React, { useState } from 'react';
import { auth } from '../firebase';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword 
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
            }
            navigate('/profile');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <section className="container auth-section">
            <div className="auth-card">
                <h2>{isLogin ? 'Вхід у систему' : 'Реєстрація'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder="Введіть email" 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Пароль</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder="Введіть пароль" 
                            required 
                        />
                    </div>
                    {error && <p className="error-msg">{error}</p>}
                    <button type="submit" className="auth-btn">
                        {isLogin ? 'Увійти' : 'Зареєструватися'}
                    </button>
                </form>
                <p className="auth-toggle">
                    {isLogin ? 'Немає акаунту?' : 'Вже є акаунт?'}
                    <span onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? ' Зареєструватися' : ' Увійти'}
                    </span>
                </p>
            </div>
        </section>
    );
};

export default Auth;
