import React from 'react';
import { List, ListItem, ListItemText, Rating } from '@mui/material';
import '../css/CommentList.css'; // Import CSS file

const CommentList = ({ comments }) => {
    return (
        <List className="comment-list">
            {comments && comments.map((comment, index) => (
                <ListItem key={index} alignItems="flex-start" className="comment-item">
                    <ListItemText
                        primary={`${comment.name} - ${comment.text}`}
                        secondary={<Rating value={parseFloat(comment.rating)} readOnly className="comment-rating" />} // Parse rating to float
                    />
                </ListItem>
            ))}
        </List>
    );
};

export default CommentList;
