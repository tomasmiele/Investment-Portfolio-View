import os
import bcrypt
import dotenv
from typing import List
from mongoengine import *
from cryptography.fernet import Fernet
from entities.stock import Stock
from models.stock_model import StocksModel
from models.fields.sensivity_field import SensivityField
from utils.encode_hmac_hash import encode_hmac_hash

class StocksRepository:
    fernet = Fernet(os.getenv("FERNET_SECRET_KEY"))

    def save(self, stock: Stock) -> None:
        stock_model = StocksModel()
        stock_dict = stock.model_dump()

        for k in StocksModel.get_normal_fields():
            if (k not in stock_dict):
                continue

            stock_model[k] = stock_dict[k]

        for k in StocksModel.sensivity_fields:
            stock_model[k] = SensivityField(fernet=self.fernet, data=stock_dict[k])

        stock_model.save()

        return None

    def find_by_stock(self, stock: str) -> list[StocksModel]:
        result = StocksModel.objects(stock=stock)
        return result
    
    def update_amount(self, stock: str, amount: float) -> None:
        stock_obj = StocksModel.objects(stock=stock).first()
        current_amount = float(stock_obj.get_decrypted_field("amount"))
        new_amount = current_amount + amount
        stock_obj.amount = SensivityField(fernet=self.fernet, data=new_amount)
        stock_obj.save()
        return None