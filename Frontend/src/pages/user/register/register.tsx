import { useState } from "react";
import styled from "styled-components";
import toast from "react-hot-toast";
import { registerApi } from "./api/register";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import nome from "../../../assets/IPV_nome.png";

export function Register() {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [loading, setLoading] = useState(false);

  async function register() {
    if (!email || !password) {
      toast.error("Preencha todas as informações corretamente.");
      return;
    }

    setLoading(true);
    let responseData = await registerApi(name, email, password);
    setLoading(false);

    if (responseData.status !== "success") {
      toast.error(responseData.message ?? "Erro ao tentar fazer o cadastro");
      return;
    }

    toast.success(responseData.message);
    window.location.href = "/homepage";
  }

  async function login() {
    window.location.href = "/login";
  }

  return (
    <RegisterPage>
      <RegisterSection>
        <LogoContainer>
          <img src={nome} alt="IPV" />
        </LogoContainer>
        <FormContainer>
        <StyledInput
            placeholder="Nome"
            onChange={(ev) => setName(ev.currentTarget.value)}
          />
          <StyledInput
            placeholder="E-mail"
            onChange={(ev) => setEmail(ev.currentTarget.value)}
          />
          <StyledInput
            placeholder="Senha"
            type="password"
            onChange={(ev) => setPassword(ev.currentTarget.value)}
          />

          <CustomButton disabled={loading} onClick={() => register()}>
            {loading ? (
              <>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Processando...
              </>
            ) : (
              "Cadastre-se"
            )}
          </CustomButton>

          <LoginButton onClick={() => login()}>Já possui uma conta? Log in</LoginButton>
        </FormContainer>
      </RegisterSection>
    </RegisterPage>
  );
}

const RegisterPage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color:  hsl(var(--background));
`;

const RegisterSection = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 .25rem .625rem  hsl(var(--quaternary-foreground));
`;

const LogoContainer = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  img {
    max-width: 100%;
    height: auto;
  }
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled.input`
  padding: .625rem;
  margin-bottom: 1rem;
  border: .0625rem solid #ccc;
  border-radius: .25rem;
  font-size: .875rem;

  &:focus {
    outline: none;
    border-color: hsl(var(--tertiary));
  }
`;

const CustomButton = styled.button`
  padding: .625rem 0;
  background-color: hsl(var(--tertiary));
  color: white;
  border: none;
  border-radius: .25rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;

  &:disabled {
    background-color: hsl(var(--tertiary));
    cursor: not-allowed;
  }

  &:hover {
    background-color: hsl(var(--primary));
  }
`;

const LoginButton = styled.button`
   margin-top: 1rem;
  text-align: center;
`;