cat <<EOF > .env
MIGRATE_DB_URL=sqlite:///dev.db
DB_URL=sqlite:///dev.db
TEST_DB_URL=sqlite:///:memory:
EOF
