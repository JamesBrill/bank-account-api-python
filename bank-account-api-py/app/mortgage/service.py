from typing import List
from sqlalchemy.orm import Session
from fastapi import HTTPException
from ..database import MortgageDB, BankAccountDB
from .model import Mortgage


class MortgageService:
    @classmethod
    def validate_applicant_exists(cls, db: Session, applicant_name: str) -> bool:
        account = db.query(BankAccountDB).filter(
            BankAccountDB.account_holder_name.ilike(applicant_name)
        ).first()
        return account is not None

    @classmethod
    def get_all_mortgages(cls, db: Session) -> List[Mortgage]:
        db_mortgages = db.query(MortgageDB).all()
        return [
            Mortgage(
                m.id, m.applicant_name, m.property_address,
                m.loan_amount, m.interest_rate, m.fixed_term_years,
                m.expiry_date, m.application_date
            ) for m in db_mortgages
        ]

    @classmethod
    def get_mortgage_by_id(cls, db: Session, id: int) -> Mortgage:
        db_mortgage = db.query(MortgageDB).filter(MortgageDB.id == id).first()
        if not db_mortgage:
            raise HTTPException(status_code=404, detail=f"Mortgage with ID {id} not found")
        return Mortgage(
            db_mortgage.id, db_mortgage.applicant_name, db_mortgage.property_address,
            db_mortgage.loan_amount, db_mortgage.interest_rate, db_mortgage.fixed_term_years,
            db_mortgage.expiry_date, db_mortgage.application_date
        )

    @classmethod
    def create_mortgage(cls, db: Session, mortgage: Mortgage) -> None:
        if not cls.validate_applicant_exists(db, mortgage.applicant_name):
            raise HTTPException(
                status_code=400,
                detail="Applicant must be an existing bank account holder"
            )
        
        db_mortgage = MortgageDB(
            applicant_name=mortgage.applicant_name,
            property_address=mortgage.property_address,
            loan_amount=mortgage.loan_amount,
            interest_rate=mortgage.interest_rate,
            fixed_term_years=mortgage.fixed_term_years,
            expiry_date=mortgage.expiry_date,
            application_date=mortgage.application_date,
        )
        db.add(db_mortgage)
        db.commit()

    @classmethod
    def delete_mortgage(cls, db: Session, id: int) -> None:
        db_mortgage = db.query(MortgageDB).filter(MortgageDB.id == id).first()
        if not db_mortgage:
            raise HTTPException(status_code=404, detail=f"Mortgage with ID {id} not found")
        db.delete(db_mortgage)
        db.commit()

