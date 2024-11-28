import hmac
import dotenv
import os
import hashlib
dotenv.load_dotenv()

def encode_hmac_hash(data: str) -> str:
    return hmac.new(bytes(os.getenv("HMAC_SECRET_KEY"), "utf-8"), bytes(data, encoding="utf-8"), hashlib.sha256).hexdigest()