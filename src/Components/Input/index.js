import React from 'react';
import styled from 'styled-components';
import ProtoTypes from 'prop-types';

const InputBase = styled.input`
    width: 100%;
    padding: 15px;
    font-size: 14px;
    border-left: 3px solid ${({ theme }) => theme.colors.primary};
    border-top: none;
    border-bottom: none;
    border-right: none;
    color: ${({ theme }) => theme.colors.contrastText};
    background-color: ${({ theme }) => theme.colors.secondary};
    outline: 0;
    margin-bottom: 25px;
    animation: blinker 2s step-start infinite;

    @keyframes blinker {
  50% {
    border-left: 3px solid #000;
  }
}
`

export default function Input({ onChange, placeholder, ...props }) {
    return (
        <>
            <InputBase
                onChange={onChange}
                placeholder={placeholder}
                {...props}
            />
        </>
    );
};

Input.defaultProps = {
    value: '',
}

Input.ProtoTypes = {
    onChange: ProtoTypes.func.isRequired,
    placeholder: ProtoTypes.string.isRequired,
    name: ProtoTypes.string.isRequired,
    value: ProtoTypes.string.isRequired,
};
