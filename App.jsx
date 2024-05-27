import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  gap: 1rem;
  background-color: #F0F0F0;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: #fff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const StyledInput = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  &:focus {
    border-color: #007BFF;
    outline: none;
  }
`;

const TextField = ({ value, onChange }) => {
  const handleOnChange = (e) => {
    onChange?.(e.target.value);
  };
  return <StyledInput type="text" value={value} onChange={handleOnChange} />;
};

const MoneyField = ({ value, onChange }) => {
  const handleOnChange = (value) => {
    const rawValue = parseFloat((value || '0').replace(/\D/g, '')) / 100;
    onChange?.(rawValue);
  };

  const formatToBRL = (amount) => {
    return amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const formattedValue = formatToBRL(value);

  return <TextField value={formattedValue} onChange={handleOnChange} />;
};

const HomeScreen = () => {
  const [total1, setTotal1] = useState(0);
  const [total2, setTotal2] = useState(0);
  const [total, setTotal] = useState(0);

  const handleMoneyChange1 = (value) => {
    setTotal1(value);
    setTotal(total2 + value);
  };

  const handleMoneyChange2 = (value) => {
    setTotal2(value);
    setTotal(total1 + value);
  };

  const handleMoneyTotal = (value) => {
    //verifivar se value é string
    if (typeof value === 'string') {
    const rawValue = parseFloat(value.replace(/\D/g, '')) / 100;
    setTotal(rawValue)
    setTotal1(rawValue / 2);
    setTotal2(rawValue / 2);
    }else{
      setTotal(value);
      setTotal1(value / 2);
    setTotal2(value / 2);
    }
    
  }

  return (
    <Container>
      <InnerContainer>
        <label>Valor 1</label>
        <MoneyField value={total1} onChange={handleMoneyChange1} />
      </InnerContainer>
      <InnerContainer>
        <label>Valor 2</label>
        <MoneyField value={total2} onChange={handleMoneyChange2} />
      </InnerContainer>
      <InnerContainer>
        <label>Total</label>
        <MoneyField value={total} onChange={handleMoneyTotal} />
      </InnerContainer>
    </Container>
  );
};

export default HomeScreen;
