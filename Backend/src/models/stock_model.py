from mongoengine import *
import datetime
from models.fields.sensivity_field import SensivityField
import os
import dotenv
import bcrypt
from cryptography.fernet import Fernet

dotenv.load_dotenv()
fernet = Fernet(os.getenv("FERNET_SECRET_KEY"))

class StocksModel(Document):
    sensivity_fields = ["amount"]

    stock = StringField(required=True, unique=True)
    amountType = StringField(required=True, choices=["value", "quantity"])
    amount: SensivityField = EmbeddedDocumentField(SensivityField)

    def get_normal_fields():
        return [i for i in StocksModel.__dict__.keys() if i[:1] != '_' and i != "sensivity_fields" and i not in StocksModel.sensivity_fields]
    
    def get_decrypted_field(self, field: str):
        if field not in self.sensivity_fields:
            raise Exception("Field not mapped")

        return fernet.decrypt(getattr(self, field, None).token).decode()