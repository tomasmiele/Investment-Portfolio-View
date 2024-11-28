from repositories.user_repository import UsersRepository
from fastapi import FastAPI, Request, Response
from use_cases.user.auth.reset_pwd.reset_pwd_use_case import ResetPwdUseCase
from use_cases.user.auth.reset_pwd.reset_pwd_dto import ResetPwdDTO
from fastapi import APIRouter

router = APIRouter()

user_repository = UsersRepository()
reset_pwd_use_case = ResetPwdUseCase(user_repository)

@router.post("/user/auth/reset/pwd")
def reset_pwd(reset_pwd_dto: ResetPwdDTO, response: Response, request: Request):
    return reset_pwd_use_case.execute(reset_pwd_dto, response, request)