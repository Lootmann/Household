from datetime import date, timedelta

from fastapi import status

from tests.factory import CategoryFactory, HouseholdFactory, random_string


class TestGetAllHouseholds:
    def test_get_all_households_with_empty(self, client):
        resp = client.get("/households")
        assert resp.status_code == status.HTTP_200_OK
        assert resp.json() == []

    def test_get_all_households_with_one_record(self, client):
        category = CategoryFactory.create_category(client, name=random_string())
        household = HouseholdFactory.create_household(client, category_id=category.id)

        resp = client.get("/households")
        assert resp.status_code == status.HTTP_200_OK

        resp_obj = resp.json()[0]
        assert resp_obj["amount"] == household.amount
        assert resp_obj["memo"] == household.memo
        assert resp_obj["registered_at"] == str(household.registered_at)
        assert resp_obj["category"]["id"] == category.id
        assert resp_obj["category"]["name"] == category.name

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

        resp_obj = resp.json()
        assert resp_obj["amount"] == household.amount
        assert resp_obj["registered_at"] == str(household.registered_at)
        assert resp_obj["memo"] == household.memo
        assert resp_obj["category"] == category

    def test_get_household_with_wrong_id(self, client):
        resp = client.get(f"/households/312")
        assert resp.status_code == status.HTTP_404_NOT_FOUND


class TestGetHouseholdFilteredByDate:
    def test_get_household_filtered_by_year(self, client):
        # create households
        # 2 of 2023's records and 5 of 2022's records
        category = CategoryFactory.create_category(client, name=random_string())
        for _ in range(2):
            HouseholdFactory.create_household(
                client,
                registered_at=date(year=2022, month=1, day=1),
                category_id=category.id,
            )

        for _ in range(5):
            HouseholdFactory.create_household(
                client,
                registered_at=date(year=2023, month=1, day=1),
                category_id=category.id,
            )

        resp = client.get("/households")
        assert len(resp.json()) == 7

        resp = client.get("/households/search?year=2022")
        assert len(resp.json()) == 2

        resp = client.get("/households/search?year=2023")
        assert len(resp.json()) == 5

    def test_get_households_filtered_by_year_and_month(self, client):
        category = CategoryFactory.create_category(client, name=random_string())

        # 5 of 2022-05, 3 of 2022-08
        for _ in range(5):
            HouseholdFactory.create_household(
                client,
                registered_at=date(year=2022, month=5, day=1),
                category_id=category.id,
            )
        for _ in range(3):
            HouseholdFactory.create_household(
                client,
                registered_at=date(year=2022, month=8, day=1),
                category_id=category.id,
            )

        # 2 of 2023-01, 8 of 2023-04
        for _ in range(2):
            HouseholdFactory.create_household(
                client,
                registered_at=date(year=2023, month=1, day=1),
                category_id=category.id,
            )
        for _ in range(8):
            HouseholdFactory.create_household(
                client,
                registered_at=date(year=2023, month=4, day=1),
                category_id=category.id,
            )

        # 2022
        resp = client.get("/households/search?year=2022&month=5")
        assert len(resp.json()) == 5

        resp = client.get("/households/search?year=2022&month=8")
        assert len(resp.json()) == 3

        resp = client.get("/households/search?year=2022")
        assert len(resp.json()) == 8

        # 2023
        resp = client.get("/households/search?year=2023&month=1")
        assert len(resp.json()) == 2

        resp = client.get("/households/search?year=2023&month=4")
        assert len(resp.json()) == 8

        resp = client.get("/households/search?year=2023")
        assert len(resp.json()) == 10

    def test_get_households_with_invalid_data(self, client):
        category = CategoryFactory.create_category(client, name=random_string())
        for _ in range(2):
            HouseholdFactory.create_household(
                client,
                registered_at=date(year=2022, month=1, day=1),
                category_id=category.id,
            )
            HouseholdFactory.create_household(
                client,
                registered_at=date(year=2023, month=1, day=1),
                category_id=category.id,
            )

        resp = client.get("/households")
        assert len(resp.json()) == 4

        resp = client.get("/households/search?month=12")
        assert resp.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY


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

    def test_create_household_with_negative_amount(self, client):
        category = CategoryFactory.create_category(client, name=random_string())

        household_data = {
            "amount": -1234,
            "registered_at": str(date.today()),
            "memo": "hoge",
            "category_id": category.id,
        }
        resp = client.post("/households", json=household_data)
        assert resp.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
        assert resp.json() == {"detail": "Amount should be Positive"}


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

    def test_patch_household(self, client):
        category1 = CategoryFactory.create_category(client, name=random_string())
        category2 = CategoryFactory.create_category(client, name=random_string())
        household = HouseholdFactory.create_household(client, category_id=category1.id)

        update_data = {
            "amount": 99999,
            "memo": "hello world",
            "registered_at": str(date.today() + timedelta(days=1)),
            "category_id": category2.id,
        }
        resp = client.patch(f"/households/{household.id}", json=update_data)
        assert resp.status_code == status.HTTP_200_OK

        resp_obj = resp.json()
        assert resp_obj["amount"] != household.amount
        assert resp_obj["amount"] == 99999
        assert resp_obj["memo"] != household.memo
        assert resp_obj["memo"] == "hello world"

    def test_patch_household_with_wrong_id(self, client):
        resp = client.patch("/households/123", json={})
        assert resp.status_code == status.HTTP_404_NOT_FOUND

    def test_patch_household_with_negative_amount(self, client):
        category = CategoryFactory.create_category(client, name=random_string())
        household = HouseholdFactory.create_household(client, category_id=category.id)

        update_data = {
            "amount": -1234,
        }
        resp = client.patch(f"/households/{household.id}", json=update_data)
        assert resp.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
        assert resp.json() == {"detail": "Amount should be Positive"}


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
