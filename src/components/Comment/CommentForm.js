import React, { useState } from 'react';
import { TextField, Button, Rating } from '@mui/material';
import '../css/CommentForm.css';

const CommentForm = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [text, setText] = useState('');
    const [rating, setRating] = useState(0);
    const [nameError, setNameError] = useState('');
    const [textError, setTextError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate inputs
        if (name.trim().length < 2) {
            setNameError('Tên phải có ít nhất 2 ký tự');
            return;
        } else {
            setNameError('');
        }

        if (text.trim().length < 3) {
            setTextError('Bình luận phải có ít nhất 3 ký tự');
            return;
        } else {
            setTextError('');
        }

        onSubmit({ name, text, rating });
        setName('');
        setText('');
        setRating(0);
    };

    return (
        <div className="comment-form-container">
            <form onSubmit={handleSubmit} className="form-container">
                <TextField
                    label="Tên"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    className="comment-input"
                    error={!!nameError}
                    helperText={nameError}
                />
                <TextField
                    label="Bình luận"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                    variant="outlined"
                    className="comment-input"
                    error={!!textError}
                    helperText={textError}
                />
                <Rating
                    value={rating}
                    onChange={(e, newValue) => setRating(newValue)}
                    precision={1}
                    className="comment-rating"
                />
                <div className='comment-btn'><Button type="submit" variant="contained" color="primary" className="submit-button">
                    Gửi
                </Button></div>

            </form>
        </div>
    );
};

export default CommentForm;
