import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

# Test /api/request-access endpoint
class TestRequestAccess:
    """Tests for the /api/request-access endpoint"""

    def test_request_access_success(self):
        response = requests.post(f"{BASE_URL}/api/request-access", json={
            "name": "Test User",
            "dealership": "Test Moto",
            "email": "test@test.com",
            "volume": "25-50"
        })
        assert response.status_code == 200
        data = response.json()
        assert data.get("success") is True
        assert "message" in data

    def test_request_access_missing_field(self):
        response = requests.post(f"{BASE_URL}/api/request-access", json={
            "name": "Test User",
            "dealership": "Test Moto",
            "email": "test@test.com"
            # missing volume
        })
        assert response.status_code == 422  # Validation error

    def test_root_endpoint(self):
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
