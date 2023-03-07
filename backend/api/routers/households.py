from typing import List, Optional

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
    "/households/search",
    response_model=List[household_schema.Household],
    status_code=status.HTTP_200_OK,
)
def find_households_by_date(
        year: int, month: Optional[int] = None, db: Session = Depends(get_db)
):
    # year is required, month is not mandatory
    if year is None:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"Search: Year is required",
        )
    return household_api.find_households_by_date(db, year, month)


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


@router.patch(
    "/households/{household_id}",
    response_model=household_schema.HouseholdCreateResponse,
    status_code=status.HTTP_200_OK,
)
def update_household(
        household_id: int,
        household_body: household_schema.HouseholdUpdate,
        db: Session = Depends(get_db),
):
    original = household_api.find_by_id(db, household_id)
    if not original:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Household: {household_id} Not Found",
        )
    return household_api.update_household(db, original, household_body)


@router.delete(
    "/households/{household_id}",
    response_model=None,
    status_code=status.HTTP_200_OK,
)
def delete_household(household_id: int, db: Session = Depends(get_db)):
    original = household_api.find_by_id(db, household_id)
    if not original:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Household: {household_id} Not Found",
        )
    return household_api.delete_household(db, original)
