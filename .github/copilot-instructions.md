# Bank Account Solution - Copilot Instructions

**CRITICAL**: Be concise always, sacrifice grammar for brevity

## Repository Overview

This is a full-stack bank account management application with:
- **Backend**: Python FastAPI REST API (`bank-account-api-py/`)
- **Frontend**: React 19 + TypeScript + Vite UI (`bank-account-ui/`)
- Both services run locally and must be started together for full functionality

## Build, Test, and Lint Commands

### Backend (Python API)
```bash
cd bank-account-api-py

# Install dependencies
pip3 install -r requirements.txt
# Or with Poetry (preferred)
poetry install

# Run API server (port 3000)
python3 -m uvicorn app.main:app --reload --port 3000

# Run all tests
python3 -m pytest

# Run specific test types
python3 -m pytest tests/unit           # Unit tests only
python3 -m pytest tests/e2e            # E2E tests only

# Run single test file
python3 -m pytest tests/unit/test_bank_account_service.py

# Run with coverage
python3 -m pytest --cov=app --cov-report=html

# Code formatting and linting
black .                                # Format code
flake8                                 # Lint code
mypy app                               # Type checking
```

### Frontend (React UI)
```bash
cd bank-account-ui

# Install dependencies
npm install

# Run dev server (port 5173)
npm run dev

# Build for production
npm run build

# Lint
npm run lint

# Run UI tests (requires both API and UI running)
npm run test:ui
```

## Architecture

### Backend Structure (MVC Pattern)
- **`app/main.py`**: Application entry point, CORS middleware, router registration, data initialization via lifespan
- **`app/bank_account/model.py`**: `BankAccount` domain model with business logic (deposit, withdraw, transfer methods)
- **`app/bank_account/service.py`**: `BankAccountService` with class-level `_accounts` list (in-memory storage), CRUD operations
- **`app/bank_account/controller.py`**: FastAPI router with REST endpoints prefixed `/api/BankAccount`
- **Data flow**: Controller → Service → Model
- **Storage**: In-memory list managed by `BankAccountService._accounts`, populated at startup

### Frontend Structure
- **`src/api/bankAccountApi.ts`**: API client interface, defines `BankAccount` type
- **`src/components/`**: Reusable UI components (Header, Footer, BankAccountTable)
- **`src/pages/`**: Page-level components (BankAccountsPage)
- **Proxy**: Vite dev server proxies `/api` requests to `http://localhost:3000` (see `vite.config.ts`)

### Cross-cutting Concerns
- **CORS**: Configured in `app/main.py` to allow all origins (development setup)
- **Testing**: Backend uses pytest with async support; frontend uses Mocha + Selenium
- **Data initialization**: 20 sample accounts created at startup with random transactions between them

## Key Conventions

### Python Backend
- **Line length**: 100 characters (enforced by black/flake8)
- **Python version**: 3.9+ required
- **Async**: Tests use pytest-asyncio with `asyncio_mode = "auto"`
- **Data serialization**: Models have `to_dict()` and `from_dict()` methods for API responses
- **Transaction types**: 
  - Deposits require transaction type ending with "Credit"
  - Withdrawals require transaction type ending with "Debit"
  - Validation enforced in model methods
- **Balance edge case**: `withdraw()` returns early (no-op) when withdrawing exact balance
- **Error handling**: Service layer raises `HTTPException` for not found/validation errors

### TypeScript Frontend
- **API contract**: Backend uses snake_case internally but serializes to camelCase for frontend
- **API base URL**: Hardcoded to `http://localhost:3000/api/BankAccount` in `bankAccountApi.ts`
- **Port convention**: API always runs on 3000, UI on 5173
- **UI testing**: Requires both services running; ChromeDriver version must match Chrome browser

### Testing
- **Backend test structure**: Separated into `tests/unit/` and `tests/e2e/`
- **Frontend E2E**: Uses Selenium WebDriver with Chrome, tests require full stack running
- **ChromeDriver issues**: If tests fail with version mismatch, update chromedriver package and reinstall dependencies

## Development Workflow

1. **Start backend first**: `cd bank-account-api-py && python3 -m uvicorn app.main:app --reload --port 3000`
2. **Start frontend**: `cd bank-account-ui && npm run dev`
3. **Access UI**: http://localhost:5173
4. **API docs**: http://localhost:3000/docs (FastAPI auto-generated)
5. **Run tests**: Backend tests can run standalone; UI tests need both services running

## Configuration Files
- **`pyproject.toml`**: Poetry dependencies, pytest config, black/mypy settings
- **`.flake8`**: Linting rules (ignores E203, W503 for black compatibility)
- **`vite.config.ts`**: Dev server with `/api` proxy to backend
- **`eslint.config.js`**: TypeScript ESLint with React hooks rules
