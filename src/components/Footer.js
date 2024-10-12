import React, { useRef, useState } from 'react';

import '../components/css/Footer.css';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';

export const Footer = () => {
    const formSend = useRef();

    const [form, setForm] = useState({
        user_name: '',
        user_email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const resetForm = () => {
        setForm({
            user_name: '',
            user_email: '',
            message: ''
        });
    };

    const validateEmail = (email) => {
        // Email validation regular expression
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const sendEmail = (e) => {
        e.preventDefault();

        if (form.user_name.length < 5) {
            toast.error('Name must be at least 5 characters long');
            return;
        }
        if (!validateEmail(form.user_email)) {
            toast.error('Please enter a valid email address');
            return;
        }
        if (form.message.length < 3) {
            toast.error('Message must be at least 3 characters long');
            return;
        }

        emailjs
            .sendForm('service_j7hehay', 'template_1mvy0tq', formSend.current, {
                publicKey: 'EXyf8s-12SG_LZ-5w',
            })
            .then(
                () => {
                    console.log('SUCCESS!');
                    resetForm();
                    toast.success('Email sent successfully!');
                },
                (error) => {
                    console.log('FAILED...', error.text);
                    toast.error('Failed to send email');
                },
            );
    };
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section about">
                    <h1 className="logo-text"><span>Mẹ Bầu và Bé</span> </h1>
                    <p>
                        Chúng tôi cung cấp các sản phẩm sữa chất lượng cao cho mẹ bầu và em bé. Luôn luôn vì sức khỏe của bạn và gia đình.
                    </p>
                    <div className="contact">
                        <span><i className="fas fa-phone"></i> &nbsp; 123-456-789</span>
                        <span><i className="fas fa-envelope"></i> &nbsp; info@sua.com</span>
                    </div>
                </div>



                <div className="footer-section contact-form">
                    <h2>Liên hệ chúng tôi</h2>
                    <br />
                    <form ref={formSend} onSubmit={sendEmail}>
                        <label>Họ và tên</label>
                        <input type="text" name="user_name" id='name' onChange={handleChange} value={form.user_name} />
                        <label>Email của bạn</label>
                        <input type="email" name="user_email" id='email' onChange={handleChange} value={form.user_email} />
                        <label>Lời nhắn</label>
                        <textarea name='message' id='message' onChange={handleChange} value={form.message} />

                        <div className='send-bnt'>
                            <button
                                type="submit"
                                value="Send"
                            >
                                Send
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="footer-bottom">
                &copy; 2024 Mẹ Bầu và Bé
            </div>
        </footer>
    );
}
