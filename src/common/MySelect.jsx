import React, { useState } from 'react';
import './my-select.scss'; // Import your CSS file for styling
import { Typography } from 'antd'

const MySelect = ({ options=[], onSelect, placeholder='Select an option' }) => {
  
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);


  const handleOptionClick = (option) => {
    setSelectedOption(option.name);
    setIsFadingOut(true);
    console.log('id', option.id)
    onSelect(option.id)
  };

  const reviseeData = (str="") => {
    str = str.toLowerCase()
    
    const revised_str = str.split('').map((c, i) => {
      // if((c < 'a' && c > 'z') || (c < 'A' && c > 'Z')) return
      if(c === '_') return ' ';
      if(i === 0) return c.toUpperCase()
      return c;
    })
    return revised_str
  }

  return (
    <div className="custom-select-container">
      <div className="selected-option" onClick={() => setIsOpen(!isOpen)}>
        <Typography.Text style={{color: 'white'}}>
          {selectedOption || placeholder}
        </Typography.Text>
      </div>
      {isOpen && (
        <div
          className={`options-container ${isFadingOut ? 'fade-out' : ''}`}
          onTransitionEnd={() => {
            if (isFadingOut) {
              setIsOpen(false);
              setIsFadingOut(false);
            }
          }}
        >
          {options?.map((option, indx) => (
            <Typography.Paragraph
              key={indx}
              className="option"
              onClick={() => handleOptionClick(option)}
            >
              {reviseeData(option?.name)}
            </Typography.Paragraph>
          ))}
        </div>
      )}
    </div>
  );
};

export default MySelect;