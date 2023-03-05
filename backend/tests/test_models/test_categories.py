from api.models.categories import Category as CategoryModel
from api.schemas import categories as category_schema


def test_category_model_repr():
    category_body = category_schema.CategoryCreate(name="hoge")
    category = CategoryModel(**category_body.dict())
    category.id = 1
    assert str(category) == f"<Category (id, name) = (1, hoge)>"
