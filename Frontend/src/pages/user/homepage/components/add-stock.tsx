import { useEffect, useState } from "react";
import styled from "styled-components";
import toast from "react-hot-toast";
import { addStockApi } from "../api/add-stock-api";

interface AddStockProps {
    addStock: (stock: { stock: string; amountType: string; amount: string | number }) => void;
  }

export function AddStock({ addStock }: AddStockProps) {    
    let [stock, setStock] = useState("");
    let [amountType, setAmountType] = useState("");
    let [amount, setAmount] = useState<string | number>("");
    let [loading, setLoading] = useState(false);

    const step = amountType === "quantity" ? 0.00001 : 0.01;

    async function handleAddStock() {
        if (!stock || !amountType || !amount) {
          toast.error("Fill in all information correctly");
          return;
        }
    
        setLoading(true);
        let responseData = await addStockApi(stock, amountType, amount);
        setLoading(false);
    
        if (responseData.status !== "success") {
          toast.error(responseData.message ?? "Error when tried to add stock");
          return;
        }
    
        toast.success(responseData.message);

        addStock({ stock, amountType, amount });
        setStock("");
        setAmountType("");
        setAmount("");
      }
    
    return (
     <StockSection>
        <FormContainer>
            <StyledParagraph>Add a stock to your portfolio</StyledParagraph>
            <FormInput>
                <StyledInput
                    placeholder="Stock (Symbol)"
                    value={stock}
                    onChange={(ev) => setStock(ev.currentTarget.value)}
                    />
                <StyledSelect name="amountType" value={amountType} onChange={(ev) => setAmountType(ev.currentTarget.value)}>
                    <option value="">Select Quantity Type</option>
                    <option value="value">Total Invested</option>
                    <option value="quantity">Quantity</option>
                </StyledSelect>
                <StyledInput
                    placeholder="Amount"
                    type="number"
                    step={step}
                    value={amount === "" ? "" : amount}
                    onChange={(ev) => {
                        const value = ev.currentTarget.value;
                        setAmount(value === "" ? "" : parseFloat(value));
                      }}
                    />
                     <StyledButton disabled={loading} onClick={() => handleAddStock()}>
                        {loading ? (
                        <>
                            Adding...
                        </>
                        ) : (
                        "Add Stock"
                        )}
                    </StyledButton>
            </FormInput>
        </FormContainer>
     </StockSection>
    )
  }

const StockSection = styled.div`
  width: 100%;
  max-width: 75rem;
  padding: .75rem;
  background: white;
  border-radius: .5rem;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormInput = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: .5rem;
  margin-bottom: .25rem;
  justify-content: space-evenly;
  width: 100%;
  gap: 1rem;
`

const StyledParagraph = styled.p`
  font-color: hsl(var(--primary));
`

const SharedStyle = `
  width: 11rem;
  height: 2.5rem;
  padding: 0.625rem;
  border: 0.0625rem solid #ccc;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: hsl(var(--tertiary));
  }
`;

const StyledInput = styled.input`
  ${SharedStyle}
`;

const StyledSelect = styled.select`
  ${SharedStyle}
`;

const StyledButton = styled.button`
  ${SharedStyle}
  background-color: hsl(var(--tertiary));
  color: white;
  border: none;
  cursor: pointer;

  &:disabled {
    background-color: hsl(var(--tertiary));
    cursor: not-allowed;
  }

  &:hover {
    background-color: hsl(var(--primary));
  }
`;