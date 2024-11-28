from pydantic import BaseModel, ConfigDict

class SendPwdRecoveryEmailDTO(BaseModel):
    model_config = ConfigDict(extra="forbid")

    email: str