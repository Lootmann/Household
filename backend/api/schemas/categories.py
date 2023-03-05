from pydantic import BaseModel, Field


class CategoryBase(BaseModel):
    class Config:
        orm_mode = True


class CategoryCreate(CategoryBase):
    name: str = Field(...)

    class Config:
        schema_extra = {
            "example": {
                "name": "grocery",
            }
        }


class CategorCreateResponse(CategoryCreate):
    id: int


class Category(CategoryBase):
    id: int
    name: str
