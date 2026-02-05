from typing import List
from sqlalchemy.orm import Session
from ..database import BankAccountDB
from .model import BankAccount


class BankAccountService:
    @classmethod
    def get_all_accounts(cls, db: Session) -> List[BankAccount]:
        db_accounts = db.query(BankAccountDB).all()
        return [
            BankAccount(
                a.id, a.account_number, a.account_holder_name, a.balance
            ) for a in db_accounts
        ]

    @classmethod
    def get_account_by_id(cls, db: Session, id: int) -> BankAccount:
        db_account = db.query(BankAccountDB).filter(BankAccountDB.id == id).first()
        if not db_account:
            from fastapi import HTTPException
            raise HTTPException(status_code=404, detail=f"Account with ID {id} not found")
        return BankAccount(
            db_account.id, db_account.account_number, 
            db_account.account_holder_name, db_account.balance
        )

    @classmethod
    def create_account(cls, db: Session, account: BankAccount) -> None:
        db_account = BankAccountDB(
            account_number=account.account_number,
            account_holder_name=account.account_holder_name,
            balance=account.balance,
        )
        db.add(db_account)
        db.commit()

    @classmethod
    def update_account(cls, db: Session, updated_account: BankAccount) -> None:
        db_account = db.query(BankAccountDB).filter(
            BankAccountDB.id == updated_account.id
        ).first()
        if not db_account:
            from fastapi import HTTPException
            raise HTTPException(
                status_code=404, detail=f"Account with ID {updated_account.id} not found"
            )
        db_account.account_number = updated_account.account_number
        db_account.account_holder_name = updated_account.account_holder_name
        db_account.balance = updated_account.balance
        db.commit()

    @classmethod
    def delete_account(cls, db: Session, id: int) -> None:
        db_account = db.query(BankAccountDB).filter(BankAccountDB.id == id).first()
        if not db_account:
            from fastapi import HTTPException
            raise HTTPException(status_code=404, detail=f"Account with ID {id} not found")
        db.delete(db_account)
        db.commit()

    @classmethod
    def initialize_accounts(cls, db: Session, accounts: List[BankAccount]) -> None:
        for account in accounts:
            db_account = BankAccountDB(
                account_number=account.account_number,
                account_holder_name=account.account_holder_name,
                balance=account.balance,
            )
            db.add(db_account)
        db.commit()

