from .add_stock_use_case import AddStockUseCase
from .add_stock_dto import AddStockDTO
from repositories.stock_repository import StocksRepository
from middlewares.validate_user_auth_token import validade_user_auth_token
from fastapi import FastAPI, Request, Response, APIRouter, Depends

router = APIRouter()

stock_repository = StocksRepository()
add_stock_use_case = AddStockUseCase(stock_repository)

@router.post("/user/homepage/add/stock", dependencies=[Depends(validade_user_auth_token)])
def add_stock(add_stock_dto: AddStockDTO, response: Response, request: Request):
    return add_stock_use_case.execute(add_stock_dto, response, request)
    