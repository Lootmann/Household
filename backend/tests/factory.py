from datetime import date
from random import randint, sample
from string import ascii_letters

from api.schemas.categories import CategoryCreateResponse
from api.schemas.households import HouseholdCreateResponse


def random_string(min_: int = 5, max_: int = 10) -> str:
    return "".join(sample(ascii_letters, randint(min_, max_)))


class CategoryFactory:
    @staticmethod
    def create_category(client, name: str) -> CategoryCreateResponse:
        resp = client.post("/categories", json={"name": name})
        return CategoryCreateResponse(**resp.json())


class HouseholdFactory:
    @staticmethod
    def create_household(
        client,
        amount: str = randint(0, 9999),
        registered_at: date = date.today(),
        memo: str = random_string(),
        category_id: int = randint(0, 10),
    ):
        household_data = {
            "amount": amount,
            "registered_at": str(registered_at),
            "memo": memo,
            "category_id": category_id,
        }
        resp = client.post("/households", json=household_data)
        return HouseholdCreateResponse(**resp.json())
