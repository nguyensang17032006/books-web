import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            textAlign: 'center',
            backgroundColor: '#f8f9fa',
            fontFamily: 'Arial, sans-serif'
        }}>

            <h2 style={{ fontSize: '24px', color: '#343a40' }}>Chức năng không tồn tại</h2>
            <p style={{ color: '#6c757d', marginBottom: '20px' }}>
                Rất tiếc, trang bạn đang tìm kiếm đã bị dời đi hoặc không tồn tại.
            </p>
            <button
                onClick={() => navigate('/')}
                style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
            >
                Quay lại Trang chủ
            </button>
        </div>
    );
};

export default NotFound;