import os
import dotenv
dotenv.load_dotenv()

config = {
    "client_url": "http://localhost:5173" if os.getenv("ENVIRONMENT") == "dev" else ""
}