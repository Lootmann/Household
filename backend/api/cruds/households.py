from typing import List

from sqlalchemy import asc, desc, extract
from sqlalchemy.orm import Session

from api.models.households import Household as HouseholdModel
from api.schemas import households as household_schema


def get_all_households(db: Session) -> List[HouseholdModel]:
    # return db.execute(select(HouseholdModel)).scalars().all()
    return (
        db.query(HouseholdModel)
        .order_by(desc(HouseholdModel.registered_at))
        .order_by(asc(HouseholdModel.category_id))
        .all()
    )


def find_households_by_date(db: Session, year: int, month: int) -> List[HouseholdModel]:
    # https://docs.sqlalchemy.org/en/20/core/sqlelement.html#sqlalchemy.sql.expression.extract
    stmt = db.query(HouseholdModel).where(
        extract("year", HouseholdModel.registered_at) == year
    )

    if month is None:
        return (
            stmt.order_by(desc(HouseholdModel.registered_at))
            .order_by(asc(HouseholdModel.category_id))
            .all()
        )

    return (
        stmt.where(extract("month", HouseholdModel.registered_at) == month)
        .order_by(desc(HouseholdModel.registered_at))
        .order_by(asc(HouseholdModel.category_id))
        .all()
    )


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


def update_household(
    db: Session,
    original: HouseholdModel,
    household_body: household_schema.HouseholdUpdate,
) -> HouseholdModel:
    if household_body.amount is not None:
        original.amount = household_body.amount
    if household_body.registered_at is not None:
        original.registered_at = household_body.registered_at
    if household_body.memo is not None:
        original.memo = household_body.memo
    if household_body.category_id is not None:
        original.category_id = household_body.category_id

    db.add(original)
    db.commit()
    db.refresh(original)
    return original


def delete_household(db: Session, household: HouseholdModel) -> None:
    db.delete(household)
    db.commit()
    return
