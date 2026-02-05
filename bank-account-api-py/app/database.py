from sqlalchemy import create_engine, Column, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "sqlite:///./bank_app.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


class BankAccountDB(Base):
    __tablename__ = "bank_accounts"

    id = Column(Integer, primary_key=True, index=True)
    account_number = Column(String, index=True)
    account_holder_name = Column(String)
    balance = Column(Float)


class MortgageDB(Base):
    __tablename__ = "mortgages"

    id = Column(Integer, primary_key=True, index=True)
    applicant_name = Column(String)
    property_address = Column(String)
    loan_amount = Column(Float)
    interest_rate = Column(Float)
    fixed_term_years = Column(Integer)
    expiry_date = Column(String)
    application_date = Column(String)


def init_db():
    Base.metadata.create_all(bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
