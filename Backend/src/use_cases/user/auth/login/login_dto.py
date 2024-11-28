from pydantic import BaseModel

class LoginDTO(BaseModel):
    email: str
    password: str