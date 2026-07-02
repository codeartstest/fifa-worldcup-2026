#!/bin/sh
echo "Starting backend server..."
cd /app/backend && node dist/server.js &
echo "Starting nginx..."
nginx -g 'daemon off;'