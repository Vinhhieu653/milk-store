// ChatComponent.jsx
import React, { useState, useEffect } from 'react';
import '../css/ChatComponent.css';

const ChatComponent = () => {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');

    useEffect(() => {
        loadMessages();
    }, []);

    const loadMessages = async () => {
        try {
            // Gọi API để lấy danh sách tin nhắn từ server
            const response = await fetch('http://localhost:4000/messages');
            if (!response.ok) {
                throw new Error('Lỗi khi lấy tin nhắn');
            }
            const data = await response.json();
            setMessages(data);
        } catch (error) {
            console.error('Lỗi khi lấy tin nhắn:', error.message);
        }
    };

    const sendMessage = async () => {
        if (inputText.trim() === '') return;

        try {
            // Gọi API để gửi tin nhắn lên server
            const response = await fetch('http://localhost:4000/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: inputText }),
            });

            if (!response.ok) {
                throw new Error('Lỗi khi gửi tin nhắn');
            }

            // Thêm tin nhắn mới vào danh sách hiển thị
            const newMessage = { text: inputText, fromUser: true };
            setMessages([...messages, newMessage]);
            setInputText('');
        } catch (error) {
            console.error('Lỗi khi gửi tin nhắn:', error.message);
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-messages">
                {messages.map((message, index) => (
                    <div key={index} className={message.fromUser ? 'user-message' : 'reply-message'}>
                        {message.text}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Nhập bình luận của bạn..."
                className="chat-input"
            />
            <button onClick={sendMessage} className="send-button">Gửi</button>
        </div>
    );
};

export default ChatComponent;
