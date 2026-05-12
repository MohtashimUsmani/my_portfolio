# Deployment Guide (Vercel + PythonAnywhere + Neon)

This guide deploys the frontend to Vercel, the Django API to PythonAnywhere, and Postgres to Neon.

## 1) Neon (Postgres)
1. Create a Neon project and database.
2. Copy the connection string (DATABASE_URL).

### Neon checklist
- Create a database user and store the password securely.
- Copy the pooled connection string (recommended for serverless).
- Allow the database to accept connections from your PythonAnywhere app.
- Save the `DATABASE_URL` for the PythonAnywhere environment.

## 2) Backend on PythonAnywhere
1. Create a PythonAnywhere account and a new web app (manual config).
2. Upload the `backend/` folder or connect the repo.
3. Create a virtual environment and install dependencies:
   - `pip install -r backend/requirements.txt`
4. Set environment variables (see `backend/.env.example`) in the WSGI file or the PythonAnywhere dashboard.
5. Run migrations:
   - `python manage.py migrate`
6. Collect static files:
   - `python manage.py collectstatic --noinput`
7. Configure the WSGI file to use `core.wsgi`.
8. Reload the web app.
### PythonAnywhere WSGI snippet (copy-paste)
```python
import os
import sys
from pathlib import Path

PROJECT_DIR = Path("/home/<your-pythonanywhere-username>/Portfolio/backend")
sys.path.append(str(PROJECT_DIR))

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")

# Example environment variables (use your real values)
os.environ.setdefault("SECRET_KEY", "replace-with-a-strong-secret")
os.environ.setdefault("DEBUG", "False")
os.environ.setdefault("DATABASE_URL", "postgres://USER:PASSWORD@HOST:PORT/DBNAME")
os.environ.setdefault(
    "ALLOWED_HOSTS",
    "<your-pythonanywhere-username>.pythonanywhere.com"
)
os.environ.setdefault(
    "CORS_ALLOWED_ORIGINS",
    "https://<your-vercel-domain>"
)
os.environ.setdefault(
    "CSRF_TRUSTED_ORIGINS",
    "https://<your-vercel-domain>"
)

from django.core.wsgi import get_wsgi_application

application = get_wsgi_application()
```

## 3) Frontend on Vercel
1. Import the repo into Vercel.
2. Framework: Other (root directory).
3. Build command:
   - `npm run build --prefix frontend`
4. Output directory:
   - `frontend/dist`
5. Set `VITE_API_BASE_URL` in Vercel Environment Variables to your PythonAnywhere API:
   - `https://<your-pythonanywhere-username>.pythonanywhere.com/api`
6. Deploy.

## 4) Validate
- Frontend loads from Vercel.
- API endpoints respond at:
  - `https://<your-pythonanywhere-username>.pythonanywhere.com/api/`
- Admin works at:
  - `https://<your-pythonanywhere-username>.pythonanywhere.com/admin/`

