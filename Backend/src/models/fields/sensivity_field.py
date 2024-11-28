from mongoengine import EmbeddedDocument, StringField
from cryptography.fernet import Fernet
from utils.encode_hmac_hash import encode_hmac_hash
import dotenv

dotenv.load_dotenv()

class SensivityField(EmbeddedDocument):
    token = StringField(required=False)
    comparison_hash = StringField(required=False)

    def __init__(self, fernet: Fernet = None, data=None, *args, **kwargs):
        super(SensivityField, self).__init__(*args, **kwargs)

        if not fernet or data is None:
            return
        
        if isinstance(data, list):
            self.token = [fernet.encrypt(item.encode()).decode() for item in data]
            self.comparison_hash = [encode_hmac_hash(item) for item in data]
        else:
            self.token = fernet.encrypt(data.encode()).decode()
            self.comparison_hash = encode_hmac_hash(data)

    def verify(self, data: str) -> bool:
        return encode_hmac_hash(data) == self.comparison_hash
