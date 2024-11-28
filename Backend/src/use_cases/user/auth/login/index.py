from use_cases.user.auth.login.login_use_case import LoginUseCase
from repositories.user_repository import UsersRepository
from fastapi import FastAPI, Request, Response
from use_cases.user.auth.login.login_dto import LoginDTO
from fastapi import APIRouter

router = APIRouter()

user_repository = UsersRepository()
login_use_case = LoginUseCase(user_repository)

@router.post("/user/auth/login")
def user_login(user_login_dto: LoginDTO, response: Response, request: Request):
    return login_use_case.execute(user_login_dto, response, request)
    