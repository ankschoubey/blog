#!/bin/bash

# Define the scripts folder path
SCRIPTS_DIR="./scripts"

# Check if the scripts folder exists
if [[ ! -d "$SCRIPTS_DIR" ]]; then
    echo "Error: '$SCRIPTS_DIR' folder not found!"
    exit 1
fi

# List all .sh files in the scripts folder
SCRIPTS=($(ls "$SCRIPTS_DIR"/*.sh 2>/dev/null))

# Check if there are any scripts in the folder
if [[ ${#SCRIPTS[@]} -eq 0 ]]; then
    echo "No scripts found in '$SCRIPTS_DIR'."
    exit 1
fi

# Display a menu of scripts
echo "Select a script to execute:"
for i in "${!SCRIPTS[@]}"; do
    SCRIPT_NAME=$(basename "${SCRIPTS[$i]}")
    echo "$((i + 1)). $SCRIPT_NAME"
done
echo "0. Exit"

# Get user input
read -p "Enter your choice: " CHOICE

# Validate input
if ! [[ "$CHOICE" =~ ^[0-9]+$ ]] || ((CHOICE < 0)) || ((CHOICE > ${#SCRIPTS[@]})); then
    echo "Invalid choice. Exiting."
    exit 1
fi

# Exit if choice is 0
if [[ "$CHOICE" -eq 0 ]]; then
    echo "Exiting."
    exit 0
fi

# Execute the selected script
SELECTED_SCRIPT="${SCRIPTS[$((CHOICE - 1))]}"
echo "Executing '$SELECTED_SCRIPT'..."
bash "$SELECTED_SCRIPT"
