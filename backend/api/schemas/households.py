from datetime import date
from typing import Optional

from fastapi import HTTPException, status
from pydantic import BaseModel, Field, validator


class HouseholdBase(BaseModel):
    amount: int = Field(...)
    registered_at: date = Field(...)
    memo: str
    category_id: int = Field(...)

    @validator("amount")
    def amount_should_be_positive(cls, val):
        if val < 0:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="Amount should be Positive",
            )
        return val

    class Config:
        orm_mode = True

        schema_extra = {
            "example": {
                "amount": 1234,
                "registered_at": date.today(),
                "memo": "Hungry :^)",
                "category_id": 1,
            }
        }


class HouseholdCreate(HouseholdBase):
    pass


class HouseholdCreateResponse(HouseholdCreate):
    id: int


class HouseholdUpdate(BaseModel):
    amount: Optional[int]
    registered_at: Optional[date]
    memo: Optional[str]
    category_id: Optional[int]

    @validator("amount")
    def amount_should_be_positive(cls, val):
        if val < 0:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="Amount should be Positive",
            )
        return val

    class Config:
        orm_mode = True

        schema_extra = {
            "example": {
                "amount": 1234,
                "registered_at": date.today(),
                "memo": "Hungry :^)",
                "category_id": 1,
            }
        }


class Household(HouseholdBase):
    id: int
