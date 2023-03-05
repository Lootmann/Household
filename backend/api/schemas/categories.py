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


class CategoryCreateResponse(CategoryCreate):
    id: int


class CategoryUpdate(BaseModel):
    name: str = Field(...)


class Category(CategoryBase):
    id: int
    name: str
