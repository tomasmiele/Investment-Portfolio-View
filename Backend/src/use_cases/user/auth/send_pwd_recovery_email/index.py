from repositories.user_repository import UsersRepository
from fastapi import FastAPI, Request, Response
from use_cases.user.auth.send_pwd_recovery_email.send_pwd_recovery_email_use_case import SendPwdRecoveryEmailUseCase
from use_cases.user.auth.send_pwd_recovery_email.send_pwd_recovery_email_dto import SendPwdRecoveryEmailDTO
from fastapi import APIRouter

router = APIRouter()

user_repository = UsersRepository()
send_pwd_recovery_email_use_case = SendPwdRecoveryEmailUseCase(user_repository)

@router.post("/user/auth/pwd/recovery/email")
def send_pwd_recovery_email(send_pwd_recovery_email_dto: SendPwdRecoveryEmailDTO, response: Response, request: Request):
    return send_pwd_recovery_email_use_case.execute(send_pwd_recovery_email_dto, response, request) 