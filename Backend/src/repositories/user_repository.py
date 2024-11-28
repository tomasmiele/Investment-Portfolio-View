import os
import bcrypt
import dotenv
from typing import List
from mongoengine import *
from cryptography.fernet import Fernet
from entities.user import User
from models.user_model import UsersModel
from models.fields.sensivity_field import SensivityField
from utils.encode_hmac_hash import encode_hmac_hash

class UsersRepository:
    fernet = Fernet(os.getenv("FERNET_SECRET_KEY"))

    def save(self, user: User) -> None:
        user_model = UsersModel()
        user_dict = user.model_dump()

        for k in UsersModel.get_normal_fields():
            if (k not in user_dict):
                continue

            user_model[k] = user_dict[k]

        for k in UsersModel.sensivity_fields:
            user_model[k] = SensivityField(fernet=self.fernet, data=user_dict[k])

        user_model.password = bcrypt.hashpw(f'{user.password}'.encode(), bcrypt.gensalt()).decode()

        user_model.save()

        return None
    
    def find_by_email(self, email: str) -> list[UsersModel]:
        result = UsersModel.objects(email=email)
        return result
    
    def find_by_id(self, id: str) -> list[UsersModel]:
        result = UsersModel.objects(id=id)
        return result
    
    def update_reset_pwd_token(self, email: str, sent_at: int, token: str) -> None:
        UsersModel.objects(email=email).update(set__reset_pwd_token_sent_at=sent_at, set__reset_pwd_token=token)
        return None
    
    def find_by_reset_pwd_token(self, token) -> list[UsersModel]:
        result: list[UsersModel] = UsersModel.objects(reset_pwd_token=token)
        return result
    
    def update_pwd(self, id: str, pwd: str) -> None:
        UsersModel.objects(id=id).update(set__password = bcrypt.hashpw(pwd.encode(), bcrypt.gensalt()).decode())
        return None
    
    def get_name(self, id: str) -> str:
        user = UsersModel.objects(id=id).first()
        if user:
            return user.name