import React from 'react';
import styled from 'styled-components';
import ProtoTypes  from 'prop-types';

const InputBase = styled.input`
    width: 100%;
    padding: 15px;
    font-size: 14px;
    border: 1px solid ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.contrastText};
    background-color: ${({ theme }) => theme.colors.secondary};
    outline: 0;
    margin-bottom: 25px;
` 



export default function Input({ onChange, placeholder, ...props }){
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
