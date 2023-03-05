from datetime import date

from fastapi import status
from tests.factory import CategoryFactory, HouseholdFactory, random_string
from tests.init_client import client


class TestGetAllHouseholds:
    def test_get_all_households_with_empty(self, client):
        resp = client.get("/households")
        assert resp.status_code == status.HTTP_200_OK
        assert resp.json() == []

    def test_get_all_households(self, client):
        category = CategoryFactory.create_category(client, name=random_string())

        for _ in range(10):
            HouseholdFactory.create_household(client, category_id=category.id)

        resp = client.get("/households")
        assert resp.status_code == status.HTTP_200_OK
        assert len(resp.json()) == 10


class TestPostHousehold:
    def test_create_household(self, client):
        category = CategoryFactory.create_category(client, name=random_string())

        today = str(date.today())

        household_data = {
            "amount": 1234,
            "registered_at": today,
            "memo": "hoge",
            "category_id": category.id,
        }
        resp = client.post("/households", json=household_data)
        assert resp.status_code == status.HTTP_201_CREATED

        resp_obj = resp.json()
        assert resp_obj["amount"] == 1234
        assert resp_obj["registered_at"] == today
        assert resp_obj["memo"] == "hoge"
        assert resp_obj["category_id"] == 1
