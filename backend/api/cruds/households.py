from typing import List

from api.models.households import Household as HouseholdModel
from api.schemas import households as household_schema
from sqlalchemy.future import select
from sqlalchemy.orm import Session


def get_all_households(db: Session) -> List[HouseholdModel]:
    return db.scalars(select(HouseholdModel)).all()
