# 1. Use an official Python runtime as a parent image
FROM python:3.11-slim

# 2. Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# 3. Set work directory
WORKDIR /app

# 4. Install dependencies
# We install system dependencies for psycopg2 (PostgreSQL)
RUN apt-get update && apt-get install -y libpq-dev gcc && rm -rf /var/lib/apt/lists/*

COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# 5. Copy project
COPY . /app/

# 6. Collect static files
RUN python manage.py collectstatic --noinput

# 7. Run the application
# Replace 'core' with your actual project name (the folder with wsgi.py)
CMD ["gunicorn", "core.wsgi", "--bind", "0.0.0.0:8080"]
