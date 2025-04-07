#!/bin/bash

DB_URL="postgresql://home-media-test:1111@127.0.0.1:5432/home-media-test"
DB_DUMP="./db-dump.dump"

echo "Checking for database dump..."
if [ ! -f "$DB_DUMP" ]; then
    echo "❌ No dump file found, skipping restore."
    exit 1
fi

echo "Waiting for PostgreSQL to be ready..."
until pg_isready -h 127.0.0.1 -p 5432 -U home-media-test; do
    sleep 5
done

echo "Checking if role 'postgres' exists..."
ROLE_EXISTS=$(psql "$DB_URL" -tAc "SELECT 1 FROM pg_roles WHERE rolname='postgres'")

if [ "$ROLE_EXISTS" != "1" ]; then
    echo "Creating role 'postgres'..."
    psql "$DB_URL" -c "CREATE ROLE postgres WITH SUPERUSER LOGIN PASSWORD '1111';"
else
    echo "Role 'postgres' already exists."
fi

echo "Restoring database from dump..."
pg_restore -d "$DB_URL" -F c "$DB_DUMP"
echo "✅ Restore complete!"