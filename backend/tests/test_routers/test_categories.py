from fastapi import status

from tests.factory import random_string
from tests.init_client import client


class TestGetAllCategories:
    def test_get_all_categories_with_empty(self, client):
        resp = client.get("/categories")
        assert resp.status_code == status.HTTP_200_OK
        assert resp.json() == []

    def test_get_all_categories(self, client):
        for _ in range(10):
            category_data = {"name": random_string()}
            resp = client.post("/categories", json=category_data)
            assert resp.status_code == status.HTTP_201_CREATED

        resp = client.get("/categories")
        assert resp.status_code == status.HTTP_200_OK
        assert len(resp.json()) == 10


class TestPostCategories:
    def test_create_category(self, client):
        category_data = {"name": "hoge"}
        resp = client.post("/categories", json=category_data)
        assert resp.status_code == status.HTTP_201_CREATED

    def test_create_category_which_dup_name(self, client):
        category_data = {"name": "hoge"}
        resp = client.post("/categories", json=category_data)
        assert resp.status_code == status.HTTP_201_CREATED

        resp = client.post("/categories", json=category_data)
        assert resp.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY


class TestUpdateCategories:
    def test_update_category(self, client):
        resp = client.post("/categories", json={"name": random_string()})
        assert resp.status_code == status.HTTP_201_CREATED

        category_id = resp.json()["id"]

        resp = client.patch(
            f"/categories/{category_id}", json={"name": random_string()}
        )
        assert resp.status_code == status.HTTP_200_OK

    def test_update_category_duplicate(self, client):
        category_data = {"name": random_string()}
        resp = client.post("/categories", json=category_data)
        assert resp.status_code == status.HTTP_201_CREATED

        category_id = resp.json()["id"]

        resp = client.patch(f"/categories/{category_id}", json=category_data)
        assert resp.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY

    def test_update_category_with_wrong_id(self, client):
        category_data = {"name": random_string()}
        resp = client.post("/categories", json=category_data)
        assert resp.status_code == status.HTTP_201_CREATED

        category_data = {"name": random_string()}
        resp = client.patch("/categories/12335", json=category_data)
        assert resp.status_code == status.HTTP_404_NOT_FOUND


class TestDeleteCategories:
    def test_delete_category(self, client):
        resp = client.post("/categories", json={"name": random_string()})
        assert resp.status_code == status.HTTP_201_CREATED

        category_id = resp.json()["id"]

        resp = client.delete(f"/categories/{category_id}")
        assert resp.status_code == status.HTTP_200_OK
        assert resp.json() == None

    def test_delete_category_with_wrong_id(self, client):
        resp = client.delete("/categories/123")
        assert resp.status_code == status.HTTP_404_NOT_FOUND
