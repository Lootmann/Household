from datetime import datetime

from api.db import Base
from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship


class Household(Base):
    __tablename__ = "households"

    id: Mapped[int] = mapped_column(primary_key=True)
    amount: Mapped[int]
    registered_at: Mapped[datetime]
    memo: Mapped[str]

    category_id: Mapped[int] = mapped_column(ForeignKey("categories.id"))
    category: Mapped["Category"] = relationship("Category", back_populates="households")

    def __repr__(self) -> str:
        return f"<Household (id, amount, registered) = ({self.id}, {self.amount}, {self.registered_at}, {self.memo})>"
