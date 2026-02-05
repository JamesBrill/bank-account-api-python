from typing import List
from fastapi import HTTPException
from .model import Mortgage


class MortgageService:
    _mortgages: List[Mortgage] = []

    @classmethod
    def get_all_mortgages(cls) -> List[Mortgage]:
        return cls._mortgages

    @classmethod
    def get_mortgage_by_id(cls, id: int) -> Mortgage:
        mortgage = next((m for m in cls._mortgages if m.id == id), None)
        if not mortgage:
            raise HTTPException(status_code=404, detail=f"Mortgage with ID {id} not found")
        return mortgage

    @classmethod
    def create_mortgage(cls, mortgage: Mortgage) -> None:
        mortgage.id = len(cls._mortgages) + 1
        cls._mortgages.append(mortgage)

    @classmethod
    def delete_mortgage(cls, id: int) -> None:
        try:
            index = next((i for i, m in enumerate(cls._mortgages) if m.id == id), None)
            if index is None:
                raise HTTPException(status_code=404, detail=f"Mortgage with ID {id} not found")
            cls._mortgages.pop(index)
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Could not delete mortgage: {str(e)}")
