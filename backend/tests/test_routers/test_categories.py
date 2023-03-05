from fastapi import status

from api.models.categories import Category as CategoryModel
from api.schemas import categories as category_schema
from tests.init_client import client


class TestGetAllCategories:
    def test_get_all_categories_with_empty(self, client):
        resp = client.get("/categories")
        assert resp.status_code == status.HTTP_200_OK
        assert resp.json() == []

    def test_get_all_categories(self, client):
        user_data = {"name": "hoge"}
        resp = client.post("/categories", json=user_data)
        assert resp.status_code == status.HTTP_201_CREATED

        resp = client.get("/categories")
        assert resp.status_code == status.HTTP_200_OK
        assert len(resp.json()) == 1


class TestPostCategories:
    def test_create_category(self, client):
        user_data = {"name": "hoge"}
        resp = client.post("/categories", json=user_data)
        assert resp.status_code == status.HTTP_201_CREATED
