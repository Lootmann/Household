from fastapi import status
from tests.factory import random_string
from tests.init_client import client


class TestGetAllHouseholds:
    def test_get_all_households_with_empty(self, client):
        resp = client.get("/households")
        assert resp.status_code == status.HTTP_200_OK
        assert resp.json() == []

    def test_get_all_households(self, client):
        # for _ in range(10):
        #     category_data = {"name": random_string()}
        #     resp = client.post("/categories", json=category_data)
        #     assert resp.status_code == status.HTTP_201_CREATED

        # resp = client.get("/categories")
        # assert resp.status_code == status.HTTP_200_OK
        # assert len(resp.json()) == 10
        pass
