import os
import jwt
from fastapi import Request, Response, HTTPException

def validade_user_auth_token(request: Request, response: Response):
    token = request.cookies.get("user_auth_token")

    if not token:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    try:
        payload = jwt.decode(token.split(" ")[1], os.getenv("USER_JWT_SECRET"), algorithms=["HS256"])

        user_id = payload.get("id")
        user_email = payload.get("email")
        request.state.auth_payload = {"user_id": user_id, "user_email": user_email}

    except jwt.PyJWTError:
        response.delete_cookie("user_auth_token")

        raise HTTPException(status_code=401, detail="Invalid JWT token")
    
    return True