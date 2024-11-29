from repositories.stock_repository import StocksRepository
from use_cases.user.homepage.add_stock.add_stock_dto import AddStockDTO
from fastapi import Request, Response
from entities.stock import Stock

class AddStockUseCase:
    stock_repository = StocksRepository

    def __init__(self, stock_repository: StocksRepository):
        self.stock_repository = stock_repository

    def execute(self, add_stock_dto: AddStockDTO, response: Response, request: Request):
        check_exists = self.stock_repository.find_by_stock(stock=add_stock_dto.stock.upper())

        if (len(check_exists) != 0):
            self.stock_repository.update_amount(stock=add_stock_dto.stock.upper(), amount=add_stock_dto.amount)
            response.status_code = 201
            return {"status": "success", "message": "Unable to update the stock"}

        add_stock_dto.stock = add_stock_dto.stock.upper()
        stock = Stock(**add_stock_dto.model_dump())

        self.stock_repository.save(stock)

        response.status_code = 201

        return{"status": "success", "message": "New stock added successfully"}