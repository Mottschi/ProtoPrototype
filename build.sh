#!/usr/bin/env bash
# exit on error
set -o errexit

pip install -r requirements.txt

#poetry install

#necessary to fix issue caused by outdated poetry version on render.com:
#pip install setuptools

python manage.py collectstatic --no-input
python manage.py migrate