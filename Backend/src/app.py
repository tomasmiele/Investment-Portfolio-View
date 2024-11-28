from fastapi import FastAPI
from mongoengine import connect
from fastapi.middleware.cors import CORSMiddleware
import os
import glob
import dotenv
from importlib import import_module

dotenv.load_dotenv()

connect(host=f"mongodb+srv://{os.getenv('MONGO_USER')}:{os.getenv('MONGO_PWD')}@investment-portifolio-v.japd2.mongodb.net/?retryWrites=true&w=majority&appName=Investment-Portifolio-View")

app = FastAPI()

@app.get("/")
def test():
    return {"status": "OK"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

working_directory = os.path.dirname(os.path.abspath(__file__))
use_cases_directory = os.path.join(working_directory, "use_cases")
routes = glob.glob(os.path.join(use_cases_directory, "**/index.py"), recursive=True)

for route in routes:
    relative_path = os.path.relpath(route, working_directory)
    module_name = os.path.splitext(relative_path)[0].replace(os.path.sep, '.')

    try:
        module = import_module(module_name)
        if hasattr(module, 'router'):
            app.include_router(module.router)
    except ModuleNotFoundError as e:
        print(f"Erro ao importar módulo {module_name}: {e}")
