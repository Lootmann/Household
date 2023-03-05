from typing import List

from sqlalchemy.future import select
from sqlalchemy.orm import Session

from api.models.categories import Category as CategoryModel
from api.schemas import categories as category_schema


def get_all_categoires(db: Session) -> List[CategoryModel]:
    return db.scalars(select(CategoryModel)).all()


def create_category(
    db: Session, category_body: category_schema.CategoryCreate
) -> CategoryModel:
    category = CategoryModel(**category_body.dict())
    db.add(category)
    db.commit()
    db.refresh(category)
    return category
