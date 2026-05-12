# --- STAGE 1: Build the Frontend ---
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# --- STAGE 2: Build the Backend ---
FROM python:3.11-slim
WORKDIR /app

# Install system dependencies for Postgres (psycopg2)
RUN apt-get update && apt-get install -y libpq-dev gcc && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the Backend code
COPY backend/ .

# Copy the built Frontend files from Stage 1
# This places the HTML/CSS/JS inside your backend folder
COPY --from=frontend-builder /app/frontend/dist ./frontend_dist

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV PORT=8080

# Collect static files (Django + Frontend assets)
RUN python manage.py collectstatic --noinput

EXPOSE 8080

CMD ["gunicorn", "core.wsgi", "--bind", "0.0.0.0:8080"]
