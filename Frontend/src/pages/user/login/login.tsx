import { useState } from "react";
import styled from "styled-components";
import toast from "react-hot-toast";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from "../../../components/ui/alert-dialog";
import { loginApi } from "./api/login";
import { sendPwdRecoveryEmailApi } from "./api/send-pwd-recovery-email"
import { ReloadIcon } from "@radix-ui/react-icons";
import nome from "../../../assets/IPV_nome.png";

export function Login() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [loading, setLoading] = useState(false);
  let [recoveryEmail, setRecoveryEmail] = useState("");

  async function login() {
    if (!email || !password) {
      toast.error("Preencha todas as informações corretamente.");
      return;
    }

    setLoading(true);
    let responseData = await loginApi(email, password);
    setLoading(false);

    if (responseData.status !== "success") {
      toast.error(responseData.message ?? "Erro ao tentar fazer login");
      return;
    }

    toast.success(responseData.message);
    window.location.href = "/homepage";
  }

  async function sendPasswordRecoveryEmail() {
    if (!recoveryEmail) {
      toast.error("Digite um email válido!");
      return;
    }

    setLoading(true);
    let responseData = await sendPwdRecoveryEmailApi(recoveryEmail);
    setLoading(false);

    if (responseData.status != "success") {
      toast.error(responseData.message);
      return;
    }

    toast.success(responseData.message);
  }

  async function register() {
    window.location.href = "/register";
  }

  return (
    <LoginPage>
      <LoginSection>
        <LogoContainer>
          <img src={nome} alt="IPV" />
        </LogoContainer>
        <FormContainer>
          <StyledInput
            placeholder="E-mail"
            onChange={(ev) => setEmail(ev.currentTarget.value)}
          />
          <StyledInput
            placeholder="Senha"
            type="password"
            onChange={(ev) => setPassword(ev.currentTarget.value)}
          />

          <CustomButton disabled={loading} onClick={() => login()}>
            {loading ? (
              <>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Processando...
              </>
            ) : (
              "Fazer login"
            )}
          </CustomButton>

          <ForgotPassword>
            <AlertDialog>
              <AlertDialogTrigger>Esqueceu sua senha?</AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Redefinir senha</AlertDialogTitle>
                  <AlertDialogDescription>
                    Enviaremos um link para redefinir sua senha para o seu email.
                    Por favor, digite abaixo o email associado à sua conta.
                  </AlertDialogDescription>
                  <StyledInput
                    placeholder="Digite seu email"
                    onChange={(ev) =>
                      setRecoveryEmail(ev.currentTarget.value)
                    }
                  />
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction
                    style={{ backgroundColor: "hsl(var(--tertiary))" }}
                    onClick={() => sendPasswordRecoveryEmail()}
                  >
                    Enviar link
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </ForgotPassword>

          <RegisterButton onClick={() => register()}>Cadastre-se</RegisterButton>
        </FormContainer>
      </LoginSection>
    </LoginPage>
  );
}

const LoginPage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color:  hsl(var(--background));
`;

const LoginSection = styled.div`
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

const ForgotPassword = styled.div`
  margin-top: 1rem;
  text-align: center;

  a {
    color: hsl(var(--tertiary));
    text-decoration: none;
    font-size: .875rem;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const RegisterButton = styled.button`
   margin-top: 1rem;
  text-align: center;
`;