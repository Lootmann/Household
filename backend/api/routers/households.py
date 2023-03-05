from typing import List

from api.cruds import households as household_api
from api.db import get_db
from api.schemas import households as household_schema
from fastapi import APIRouter, Depends, status
from fastapi.exceptions import HTTPException
from sqlalchemy.orm import Session

router = APIRouter(tags=["households"])


@router.get(
    "/households",
    response_model=List[household_schema.Household],
    status_code=status.HTTP_200_OK,
)
def get_all_households(db: Session = Depends(get_db)):
    return household_api.get_all_households(db)


@router.post(
    "/households",
    response_model=household_schema.HouseholdCreateResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_household(
    household_body: household_schema.HouseholdCreate, db: Session = Depends(get_db)
):
    return household_api.create_household(db, household_body)
