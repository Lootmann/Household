from datetime import date

from fastapi import status

from tests.factory import CategoryFactory, HouseholdFactory, random_string


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


class TestGetHousehold:
    def test_get_household(self, client):
        category = CategoryFactory.create_category(client, name=random_string())
        household = HouseholdFactory.create_household(client, category_id=category.id)

        resp = client.get(f"/households/{household.id}")
        assert resp.status_code == status.HTTP_200_OK

    def test_get_household_with_wrong_id(self, client):
        resp = client.get(f"/households/312")
        assert resp.status_code == status.HTTP_404_NOT_FOUND


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


class TestPatchHousehold:
    def test_patch_household_empty_fields(self, client):
        category = CategoryFactory.create_category(client, name=random_string())
        household = HouseholdFactory.create_household(client, category_id=category.id)

        update_data = {}
        resp = client.patch(f"/households/{household.id}", json=update_data)
        assert resp.status_code == status.HTTP_200_OK

        resp_obj = resp.json()
        assert resp_obj["amount"] == household.amount
        assert resp_obj["memo"] == household.memo
        assert resp_obj["registered_at"] == str(household.registered_at)
        assert resp_obj["category_id"] == household.category_id

    def test_patch_household_with_some_field(self, client):
        category = CategoryFactory.create_category(client, name=random_string())
        household = HouseholdFactory.create_household(client, category_id=category.id)

        update_data = {"amount": 99999, "memo": "hello world"}
        resp = client.patch(f"/households/{household.id}", json=update_data)
        assert resp.status_code == status.HTTP_200_OK

        resp_obj = resp.json()
        assert resp_obj["amount"] != household.amount
        assert resp_obj["amount"] == 99999
        assert resp_obj["memo"] != household.memo
        assert resp_obj["memo"] == "hello world"


class TestDeleteHousehold:
    def test_delete_household(self, client):
        category = CategoryFactory.create_category(client, name=random_string())
        household = HouseholdFactory.create_household(client, category_id=category.id)

        resp = client.get("/households")
        assert resp.status_code == status.HTTP_200_OK
        assert len(resp.json()) == 1

        resp = client.delete(f"/households/{household.id}")
        assert resp.status_code == status.HTTP_200_OK

        resp = client.get("/households")
        assert resp.status_code == status.HTTP_200_OK
        assert len(resp.json()) == 0

    def test_delete_household_with_wrong_id(self, client):
        resp = client.delete("/households/321")
        assert resp.status_code == status.HTTP_404_NOT_FOUND
