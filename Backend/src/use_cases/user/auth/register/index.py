from use_cases.user.auth.register.register_use_case import RegisterUseCase
from repositories.user_repository import UsersRepository
from fastapi import FastAPI, Request, Response
from use_cases.user.auth.register.register_dto import RegisterDTO
from fastapi import APIRouter

router = APIRouter()

user_repository = UsersRepository()
user_register_use_case = RegisterUseCase(user_repository)

@router.post("/user/auth/register")
def user_register(register_dto: RegisterDTO, response: Response, request: Request):
    return user_register_use_case.execute(register_dto, response, request)
    