#!/bin/bash
echo "Installing Launcher Service..."

SERVICE_NAME="LauncherService"
NODE_PATH="/usr/bin/node"
APP_PATH="/path/to/launcher/server/index.js"

nssm install "$SERVICE_NAME" "$NODE_PATH" "$APP_PATH"
nssm set "$SERVICE_NAME" AppDirectory "/path/to/launcher/server"
nssm start "$SERVICE_NAME"

echo "Service installed and started!"