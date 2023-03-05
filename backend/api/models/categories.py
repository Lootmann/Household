from sqlalchemy.orm import Mapped, mapped_column

from api.db import Base


class Category(Base):
    __tablename__ = "categories"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]

    def __repr__(self) -> str:
        return f"<Category (id, name) = ({self.id}, {self.name})>"
