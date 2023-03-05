from typing import List

from fastapi import APIRouter, Depends, status
from fastapi.exceptions import HTTPException
from sqlalchemy.orm import Session

from api.cruds import categories as category_api
from api.db import get_db
from api.schemas import categories as category_schema

router = APIRouter(tags=["users"])


@router.get(
    "/categories",
    response_model=List[category_schema.Category],
    status_code=status.HTTP_200_OK,
)
def get_all_categories(db: Session = Depends(get_db)):
    return category_api.get_all_categoires(db)


@router.post(
    "/categories",
    response_model=category_schema.CategorCreateResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_category(
    category_body: category_schema.CategoryCreate,
    db: Session = Depends(get_db),
):
    if category_api.exist(db, category_body.name):
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"Category Duplicate Name: {category_body.name}",
        )

    return category_api.create_category(db, category_body)


@router.patch(
    "/categories/{category_id}",
    response_model=category_schema.CategorCreateResponse,
    status_code=status.HTTP_200_OK,
)
def update_category(
    category_id: int,
    category_body: category_schema.CategoryUpdate,
    db: Session = Depends(get_db),
):
    if category_api.exist(db, category_body.name):
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"Category Duplicate Name: {category_body.name}",
        )

    origin = category_api.find_by_id(db, category_id)
    if not origin:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Category: {category_id} Not Found",
        )

    return category_api.update_category(db, origin, category_body)


@router.delete(
    "/categories/{category_id}",
    response_model=None,
    status_code=status.HTTP_200_OK,
)
def delete_category(category_id: int, db: Session = Depends(get_db)):
    category = category_api.find_by_id(db, category_id)
    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Category: {category_id} Not Found",
        )

    return category_api.delete_category(db, category)
