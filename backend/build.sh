#!/usr/bin/env bash
# build.sh — Render runs this during deployment

set -o errexit   # exit on error

pip install -r requirements.txt

python manage.py collectstatic --no-input
python manage.py migrate
