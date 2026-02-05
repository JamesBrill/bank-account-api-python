import random
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import init_db, SessionLocal
from .bank_account.controller import router as bank_account_router
from .bank_account.model import BankAccount
from .bank_account.service import BankAccountService
from .mortgage.controller import router as mortgage_router
from .prime.controller import router as prime_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    db = SessionLocal()
    try:
        # Only populate if DB is empty
        from .database import BankAccountDB
        if db.query(BankAccountDB).count() == 0:
            populate_account_data(db)
    finally:
        db.close()
    yield


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(bank_account_router)
app.include_router(mortgage_router)
app.include_router(prime_router)


def populate_account_data(db):
    from .database import BankAccountDB
    
    # Check if already populated
    existing = db.query(BankAccountDB).first()
    if existing:
        return
    
    # Realistic customer data
    customers = [
        ("James Anderson", "ACC-2847-6193-0001", 15420.50),
        ("Sarah Thompson", "ACC-2847-6193-0002", 3240.75),
        ("Michael Chen", "ACC-2847-6193-0003", 87650.00),
        ("Emily Rodriguez", "ACC-2847-6193-0004", 542.80),
        ("David Wilson", "ACC-2847-6193-0005", 28900.25),
        ("Jessica Martinez", "ACC-2847-6193-0006", 6755.40),
        ("Christopher Brown", "ACC-2847-6193-0007", 125000.00),
        ("Amanda Taylor", "ACC-2847-6193-0008", 1820.15),
        ("Daniel Garcia", "ACC-2847-6193-0009", 45300.60),
        ("Michelle Lee", "ACC-2847-6193-0010", 890.00),
        ("Robert Johnson", "ACC-2847-6193-0011", 72400.80),
        ("Jennifer Davis", "ACC-2847-6193-0012", 19650.25),
        ("William Martinez", "ACC-2847-6193-0013", 4125.90),
        ("Ashley Anderson", "ACC-2847-6193-0014", 98500.00),
        ("Matthew Thomas", "ACC-2847-6193-0015", 2340.50),
        ("Lauren White", "ACC-2847-6193-0016", 55780.30),
        ("Joshua Harris", "ACC-2847-6193-0017", 8920.00),
        ("Samantha Clark", "ACC-2847-6193-0018", 165000.00),
        ("Andrew Lewis", "ACC-2847-6193-0019", 12450.75),
        ("Megan Walker", "ACC-2847-6193-0020", 34200.60),
    ]
    
    accounts = []
    for i, (name, acc_num, balance) in enumerate(customers, start=1):
        account = BankAccount(i, acc_num, name, balance)
        accounts.append(account)

    BankAccountService.initialize_accounts(db, accounts)
    print(f"Initialized {len(accounts)} bank accounts with realistic data")


@app.get("/")
def read_root():
    return {"message": "Bank Account API running on http://localhost:3000/api/BankAccount"}


if __name__ == "__main__":
    import uvicorn

    print("Bank Account API running on http://localhost:3000/api/BankAccount")
    uvicorn.run(app, host="0.0.0.0", port=3000)
