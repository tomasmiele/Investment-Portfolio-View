import dotenv
from pydantic import BaseModel
from typing import Literal, Union

dotenv.load_dotenv()

class Stock(BaseModel):
    _id: str
    stock: str
    amountType: Literal["value", "quantity"]
    amount: Union[str, float]