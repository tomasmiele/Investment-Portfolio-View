from pydantic import BaseModel, ConfigDict
from typing import Literal

class AddStockDTO(BaseModel):
    model_config = ConfigDict(extra="forbid")

    stock: str
    amountType: Literal["value", "quantity"]
    amount: str | float