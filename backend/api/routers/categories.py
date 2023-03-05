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
def get_all_words(db: Session = Depends(get_db)):
    return category_api.get_all_categoires(db)


@router.post(
    "/categories",
    response_model=category_schema.CategorCreateResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_word(
    category_body: category_schema.CategoryCreate,
    db: Session = Depends(get_db),
):
    return category_api.create_category(db, category_body)
