import React from 'react';
import styles from '../styles/message-input.module.scss'; // Assuming your SCSS file is named MessageInput.scss

const MessageInput = () => {
  return (
    <div className={styles.messageInputContainer}>
      <input type="text" placeholder="Type your message here..." />
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
