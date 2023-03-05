from typing import List

from api.db import Base
from api.models.households import Household
from sqlalchemy.orm import Mapped, mapped_column, relationship


class Category(Base):
    __tablename__ = "categories"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]

    households: Mapped[List["Household"]] = relationship(
        "Household", back_populates="category"
    )

    def __repr__(self) -> str:
        return f"<Category (id, name) = ({self.id}, {self.name})>"
