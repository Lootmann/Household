from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from api.cruds import households as household_api
from api.db import get_db
from api.schemas import households as household_schema

router = APIRouter(tags=["households"])


@router.get(
    "/households",
    response_model=List[household_schema.Household],
    status_code=status.HTTP_200_OK,
)
def get_all_households(db: Session = Depends(get_db)):
    return household_api.get_all_households(db)


@router.get(
    "/households/{household_id}",
    response_model=household_schema.Household,
    status_code=status.HTTP_200_OK,
)
def get_household_by_id(household_id: int, db: Session = Depends(get_db)):
    household = household_api.find_by_id(db, household_id)
    if not household:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Household: {household_id} Not Found",
        )
    return household


@router.post(
    "/households",
    response_model=household_schema.HouseholdCreateResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_household(
    household_body: household_schema.HouseholdCreate, db: Session = Depends(get_db)
):
    return household_api.create_household(db, household_body)
