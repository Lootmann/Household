from datetime import date

from api.db import Base
from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship


class Household(Base):
    __tablename__ = "households"

    id: Mapped[int] = mapped_column(primary_key=True)
    amount: Mapped[int]
    registered_at: Mapped[date]
    memo: Mapped[str]

    category_id: Mapped[int] = mapped_column(ForeignKey("categories.id"))
    category: Mapped["Category"] = relationship("Category", back_populates="households")

    def __repr__(self) -> str:
        return (
            "<Household (id, amount, registered_at, memo)"
            + f" = ({self.id}, {self.amount}, {self.registered_at}, {self.memo})>"
        )
