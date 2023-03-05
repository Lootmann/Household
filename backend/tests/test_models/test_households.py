from datetime import date

from api.models.households import Household as HouseholdModel
from api.schemas import households as household_schema


def test_household_model_repr():
    today = date.today()
    household_body = household_schema.HouseholdCreate(
        amount=0, registered_at=today, memo="hogehoge", category_id=1
    )
    household = HouseholdModel(**household_body.dict())
    household.id = 1

    assert (
        str(household)
        == f"<Household (id, amount, registered_at, memo) = (1, 0, {today}, hogehoge)>"
    )
