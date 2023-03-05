from typing import List

from sqlalchemy import func
from sqlalchemy.future import select
from sqlalchemy.orm import Session

from api.models.categories import Category as CategoryModel
from api.schemas import categories as category_schema


def get_all_categoires(db: Session) -> List[CategoryModel]:
    return db.scalars(select(CategoryModel)).all()


def find_by_id(db: Session, category_id: int) -> CategoryModel | None:
    return db.scalar(select(CategoryModel).where(CategoryModel.id == category_id))


def find_by_name(db: Session, category_name: str) -> CategoryModel | None:
    return db.scalar(
        select(CategoryModel).where(
            func.lower(CategoryModel.name) == func.lower(category_name)
        )
    )


def exist(db: Session, category_name: str) -> bool:
    return find_by_name(db, category_name) is not None


def create_category(
    db: Session, category_body: category_schema.CategoryCreate
) -> CategoryModel:
    category = CategoryModel(**category_body.dict())
    db.add(category)
    db.commit()
    db.refresh(category)
    return category


def update_category(
    db: Session, origin: CategoryModel, category_body: category_schema.CategoryUpdate
) -> CategoryModel:
    origin.name = category_body.name
    db.add(origin)
    db.commit()
    db.refresh(origin)
    return origin
