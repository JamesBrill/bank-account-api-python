from typing import List
from fastapi import APIRouter, status
from .service import MortgageService
from .model import Mortgage

router = APIRouter(prefix="/api/Mortgage", tags=["Mortgage"])


@router.get("", response_model=List[dict])
def get_all_mortgages():
    mortgages = MortgageService.get_all_mortgages()
    return [mortgage.to_dict() for mortgage in mortgages]


@router.get("/{id}", response_model=dict)
def get_mortgage_by_id(id: int):
    mortgage = MortgageService.get_mortgage_by_id(id)
    return mortgage.to_dict()


@router.post("", status_code=status.HTTP_201_CREATED)
def create_mortgage(mortgage: dict):
    mortgage_obj = Mortgage.from_dict(mortgage)
    MortgageService.create_mortgage(mortgage_obj)
    return None


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_mortgage(id: int):
    MortgageService.delete_mortgage(id)
    return None
