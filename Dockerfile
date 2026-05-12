# --- STAGE 1: Build the Frontend ---
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend
# Note the folder prefix 'frontend/'
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# --- STAGE 2: Python Backend ---
FROM python:3.11-slim
WORKDIR /app

# Install system dependencies for Postgres
RUN apt-get update && apt-get install -y libpq-dev gcc && rm -rf /var/lib/apt/lists/*

# Install Python requirements
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the Backend code
COPY backend/ .

# Copy the built Frontend files from Stage 1 into the backend folder
# This assumes your build output is in a 'dist' folder
COPY --from=frontend-builder /app/frontend/dist ./frontend_dist

ENV PYTHONUNBUFFERED=1
ENV PORT=8080

# Collect static files so WhiteNoise can serve them
RUN python manage.py collectstatic --noinput

EXPOSE 8080

CMD ["gunicorn", "core.wsgi", "--bind", "0.0.0.0:8080"]
