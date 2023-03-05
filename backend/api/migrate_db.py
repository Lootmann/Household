from api.models.categories import Category
from api.models.households import Household
from api.settings import Settings
from sqlalchemy import create_engine

setting = Settings()

engine = create_engine(setting.migrate_db_url, echo=True)


def reset_database():
    Household.metadata.drop_all(bind=engine)
    Household.metadata.create_all(bind=engine)

    Category.metadata.drop_all(bind=engine)
    Category.metadata.create_all(bind=engine)


if __name__ == "__main__":
    reset_database()
