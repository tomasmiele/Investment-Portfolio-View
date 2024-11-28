from pydantic import BaseModel, ConfigDict

class ResetPwdDTO(BaseModel):
    model_config = ConfigDict(extra="forbid")

    token: str
    password: str