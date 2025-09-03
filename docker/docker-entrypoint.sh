#!/bin/sh

# Replace environment variables in built files
# This allows runtime environment variable injection in Docker

echo "Starting MyLightWay application..."

# Find all JS files in the build directory and replace environment variable placeholders
find /usr/share/nginx/html -type f -name "*.js" -exec sed -i "s|__VITE_API_BASE_URL__|${VITE_API_BASE_URL:-http://localhost:3000/api}|g" {} \;

# Print environment info
echo "Environment: ${NODE_ENV:-production}"
echo "API Base URL: ${VITE_API_BASE_URL:-http://localhost:3000/api}"

# Execute the main command
exec "$@"