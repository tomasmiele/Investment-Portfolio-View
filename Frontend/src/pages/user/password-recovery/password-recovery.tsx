import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import styled from "styled-components";
import icon from "../../../assets/portofolio.png";
import { useState } from "react";
import toast from "react-hot-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useParams } from "react-router-dom";
import { resetPasswordApi } from "./api/reset-password-api";

export function PasswordRecovery() {
  let [password, setPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");
  let [loading, setLoading] = useState(false);

  let { token } = useParams();

  async function resetPassword() {
    if (!token) {
      toast.error("Token inválido.");
      return;
    } else if (confirmPassword !== password) {
      toast.error("Senhas não coincidem.");
      return;
    }

    setLoading(true);
    let responseData = await resetPasswordApi(token, password);
    setLoading(false);

    if (responseData.status !== "success") {
      toast.error(responseData.message);
      return;
    }

    toast.success("Senha alterada com sucesso. Redirecionando para o login...");

    setTimeout(() => {
      window.location.href = "/login";
    }, 3000);
  }

  return (
    <PasswordRecoveryStyle>
      <RecoverySection>
        <LogoContainer>
          <img src={icon} alt="Insper Jr." />
        </LogoContainer>

        <FormContainer>
          <StyledLabel>Nova senha</StyledLabel>
          <StyledInput 
            type="password" 
            placeholder="Digite sua nova senha" 
            onChange={(ev) => setPassword(ev.currentTarget.value)} 
          />
          <StyledLabel>Confirmar senha</StyledLabel>
          <StyledInput 
            type="password" 
            placeholder="Digite novamente sua nova senha" 
            onChange={(ev) => setConfirmPassword(ev.currentTarget.value)} 
          />

          <CustomButton 
            disabled={loading} 
            onClick={() => resetPassword()}
          >
            {loading ? (
              <>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Processando...
              </>
            ) : (
              "Confirmar redefinição"
            )}
          </CustomButton>
        </FormContainer>
      </RecoverySection>

      <BannerContainer>
      </BannerContainer>
    </PasswordRecoveryStyle>
  );
}

const PasswordRecoveryStyle = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

const RecoverySection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  padding: 2rem;
  background-color: white;
`;

const BannerContainer = styled.div`
  width: 50%;
  height: 100%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const LogoContainer = styled.div`
  margin-bottom: 2rem;

  img {
    width: 25rem;
    height: auto;
  }
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledInput = styled(Input)`
  margin-bottom: 1rem;
  width: 100%;
  font-size: 1rem;
  padding: 0.75rem;
`;

const StyledLabel = styled(Label)`
  margin-bottom: 0.3125rem;
  margin-top: 1rem;
  font-size: 1rem;
  text-align: left;
  width: 100%;
`;

const CustomButton = styled(Button)`
  width: 100%;
  background-color: rgb(227, 0, 0);
  color: white;
  border-radius: 1.5625rem;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.75rem;
  text-align: center;

  &:hover {
    background-color: rgb(200, 0, 0);
  }
`;