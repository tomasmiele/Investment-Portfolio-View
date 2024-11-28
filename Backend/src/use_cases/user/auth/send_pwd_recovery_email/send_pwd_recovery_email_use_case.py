from repositories.user_repository import UsersRepository
from fastapi import Request, Response
from use_cases.user.auth.send_pwd_recovery_email.send_pwd_recovery_email_dto import SendPwdRecoveryEmailDTO
from datetime import datetime
from utils.send_email import send_email
import uuid
from config.config import config

class SendPwdRecoveryEmailUseCase:
    user_repository: UsersRepository

    def __init__(self, user_repository: UsersRepository):
        self.user_repository = user_repository

    def execute(self, send_pwd_recovery_email_dto: SendPwdRecoveryEmailDTO, response: Response, request: Request):
        check_exists = self.user_repository.find_by_email(email=send_pwd_recovery_email_dto.email)

        if (len(check_exists) == 0):
            response.status_code = 404
            return {"status": "error", "message": "Não foi possível achar um usuário com o email fornecido"}

        user = check_exists[0]

        if user.reset_pwd_token_sent_at + 3600 > datetime.now().timestamp():
            response.status_code = 400
            return {"status": "error", "message": "Você pode solicitar o link para redefinir sua senha a cada 1 hora."} 
        
        token = str(uuid.uuid4())

        self.user_repository.update_reset_pwd_token(email=user.email, sent_at=datetime.now().timestamp(), token=token)
        
        email_content = f"""
        <p>Olá {user.name},</p>
        <p>Para que você possa redefinir a senha da sua conta clique aqui:</p>
        <a href="{config["client_url"] + "/user/password-recovery/" + token}">
        """

        send_email(email=user.email, content=email_content, subject="Link de redefinição de senha do Investment Portifolio View")

        response.status_code = 200
        return {"status": "success", "message": "Link de redefinição de senha enviado com sucesso"}