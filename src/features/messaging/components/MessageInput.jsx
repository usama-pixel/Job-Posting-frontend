import React from 'react';
import styles from '../styles/message-input.module.scss'; // Assuming your SCSS file is named MessageInput.scss

const MessageInput = ({ message, setMessage, onSubmit }) => {
  return (
    <div className={styles.messageInputContainer}>
      <input
        value={message}
        onChange={e => setMessage(e.target.value)}
        type="text"
        placeholder="Type your message here..."
        onKeyUp={e => {
          if (e.key === 'Enter') {
            onSubmit();
          }
        }}
      />
      <div className={styles.icons}>
        <button className={styles.iconButton}>
          {/* Icon can be from any icon library like FontAwesome */}
          😊 {/* Placeholder for smiley icon */}
        </button>
        <button className={styles.iconButton}>
          {/* Placeholder for camera icon */}
          📷
        </button>
        <button className={styles.iconButton}>
          {/* Placeholder for microphone icon */}
          🎤
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
