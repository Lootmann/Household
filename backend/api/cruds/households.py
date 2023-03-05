from typing import List

from api.models.households import Household as HouseholdModel
from api.schemas import households as household_schema
from sqlalchemy.future import select
from sqlalchemy.orm import Session


def get_all_households(db: Session) -> List[HouseholdModel]:
    return db.scalars(select(HouseholdModel)).all()


def create_household(
    db: Session, household_body: household_schema.HouseholdCreate
) -> HouseholdModel:
    household = HouseholdModel(**household_body.dict())
    db.add(household)
    db.commit()
    db.refresh(household)
    return household
