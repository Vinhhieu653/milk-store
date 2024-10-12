import React, { useState, useEffect } from 'react';
import '../components/css/Knowledge.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Knowledge = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            const response = await axios.get('http://localhost:4000/knowledge');
            setArticles(response.data);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu:', error);
        }
    };

    return (
        <div className="knowledge-container">
            <h1>Kiến thức về Sữa</h1>
            <div className="articles-container">
                {articles.map((article) => (
                    <div key={article.id} className="article">
                        <Link to={`/knowledge/${article.id}`} style={{ textDecoration: 'none' }}>
                            <h2 className="article-title">{article.title}</h2>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Knowledge;
