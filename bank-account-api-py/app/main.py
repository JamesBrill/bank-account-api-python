import random
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .bank_account.controller import router as bank_account_router
from .bank_account.model import BankAccount
from .bank_account.service import BankAccountService
from .mortgage.controller import router as mortgage_router
from .prime.controller import router as prime_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    populate_account_data()
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


def populate_account_data():
    names = [
        "John Smith",
        "Maria Garcia",
        "Mohammed Khan",
        "Sophie Dubois",
        "Liam Johnson",
        "Emma Martinez",
        "Noah Lee",
        "Olivia Kim",
    ]
    accounts = []

    for i in range(20):
        account = BankAccount(
            i + 1, f"Account {i}", names[i % len(names)], random.randint(10, 10010)
        )
        accounts.append(account)

    for from_acc in accounts:
        for to_acc in accounts:
            if from_acc != to_acc:
                try:
                    transfer_amt = round(random.random() * from_acc.balance)
                    if transfer_amt > from_acc.balance:
                        continue

                    from_acc.withdraw(transfer_amt, "Debit")
                    to_acc.deposit(transfer_amt, "Credit")

                    print(
                        f"Transfer: ${transfer_amt} from {from_acc.account_number} "
                        f"({from_acc.account_holder_name}) to {to_acc.account_number} "
                        f"({to_acc.account_holder_name})"
                    )
                except Exception as e:
                    print(f"Transfer failed: {str(e)}")

    BankAccountService.initialize_accounts(accounts)


@app.get("/")
def read_root():
    return {"message": "Bank Account API running on http://localhost:3000/api/BankAccount"}


if __name__ == "__main__":
    import uvicorn

    print("Bank Account API running on http://localhost:3000/api/BankAccount")
    uvicorn.run(app, host="0.0.0.0", port=3000)
