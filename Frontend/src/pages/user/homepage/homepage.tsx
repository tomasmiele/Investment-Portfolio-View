import styled from "styled-components"
import { Route, Routes, useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react';
import { Header } from "./components/header";
import { AddStock } from "./components/add-stock";

export function Homepage() {
  const navigate = useNavigate();

  const [stocks, setStocks] = useState<
    { stock: string; amountType: string; amount: string | number }[]
  >([]);

  const addStockToList = (newStock: {
    stock: string;
    amountType: string;
    amount: string | number;
  }) => {
    setStocks((prevStocks) => [...prevStocks, newStock]);
  };

  return (
   <HomepageStyle>
        <Header />
        <HomepageBody>
          <AddStock addStock={addStockToList}/>
          <StockList>
          {stocks.map((stock, index) => (
            <li key={index}>
              {stock.stock} - {stock.amountType}: {stock.amount}
            </li>
          ))}
        </StockList>
        </HomepageBody>
   </HomepageStyle>
  )
}

const HomepageStyle = styled.div`
background-color: rgba(var(--homepage-bg), 1);
display: grid;
grid-template-rows: auto 1fr;
height: 100%;
width: 100%;
`

const HomepageBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 1rem;
`

const StockList = styled.ul`
  margin-top: 1rem;
  list-style: none;
  padding: 0;
  width: 100%;
  max-width: 500px;

  li {
    padding: 0.5rem 0;
    border-bottom: 1px solid #ccc;
  }
`;
