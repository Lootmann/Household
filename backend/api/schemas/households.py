from datetime import date

from pydantic import BaseModel, Field


class HouseholdBase(BaseModel):
    amount: int = Field(...)
    registered_at: date = Field(...)
    memo: str

    class Config:
        orm_mode = True

        schema_extra = {
            "example": {
                "amount": 1234,
                "registered_at": date.today(),
                "memo": "Hungry :^)",
            }
        }


class HouseholdCreate(HouseholdBase):
    pass


class HouseholdCreateResponse(HouseholdCreate):
    id: int


class HouseholdUpdate(BaseModel):
    pass


class Household(HouseholdBase):
    id: int