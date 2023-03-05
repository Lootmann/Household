from typing import List

from sqlalchemy.orm import Session

from api.models.households import Household as HouseholdModel
from api.schemas import households as household_schema


def get_all_households(db: Session) -> List[HouseholdModel]:
    # return db.execute(select(HouseholdModel)).scalars().all()
    return db.query(HouseholdModel).all()


def find_by_id(db: Session, household_id: int) -> HouseholdModel | None:
    return db.get(HouseholdModel, household_id)


def create_household(
    db: Session, household_body: household_schema.HouseholdCreate
) -> HouseholdModel:
    household = HouseholdModel(**household_body.dict())
    db.add(household)
    db.commit()
    db.refresh(household)
    return household
