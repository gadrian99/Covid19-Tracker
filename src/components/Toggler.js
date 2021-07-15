import React from 'react'
import { func, string } from 'prop-types';

import styled from "styled-components"

const Button = styled.button`
  background: ${({ theme }) => theme.background};
  color: #fff;
  border-radius: 5px;
  border: 0px solid black;
  box-shadow: 0px 0px 5px 2px rgb(100, 100, 100) !important;
  cursor: pointer;
  font-size: 1rem;
  padding: 1rem;
  margin-left: 2rem;
  min-width: 130px;
  max-height: 60px;
  }
\``;

const Toggle = ({theme,  toggleTheme }) => {
    const text = theme === 'light' ? 'Dark' : 'Light';
    return (
        <Button onClick={toggleTheme} >
          {text} Mode 
        </Button>
    );
};

Toggle.propTypes = {
    theme: string.isRequired,
    toggleTheme: func.isRequired,
}

export default Toggle
