#!/bin/bash

# Directory containing blog folders
BLOG_DIR="src/content/post/"

# List of commit types
COMMIT_TYPES=("addPost" "updatePost" "deletePost" "updateImage" "improveSEO" "fixBug" "refactor" "other")

# Function to display a menu and get user choice
function choose_option() {
    local prompt="$1"
    shift
    local options=("$@")
    for i in "${!options[@]}"; do
        echo "$((i + 1)): ${options[i]}"
    done

    while true; do
        read -p "$prompt " choice
        if [[ "$choice" =~ ^[0-9]+$ ]] && ((choice >= 1)) && ((choice <= ${#options[@]})); then
            echo "${options[$((choice - 1))]}"
            break
        else
            echo "Invalid choice. Please select a valid number."
        fi
    done
}

# Choose Blog
echo "Choose Blog:"
folders=($(ls -d "${BLOG_DIR}"*/ | xargs -n 1 basename))

if [[ ${#folders[@]} -eq 0 ]]; then
    echo "No blog folders found in $BLOG_DIR."
    exit 1
fi

chosen_folder=$(choose_option "Enter the number of your choice:" "${folders[@]}")

# Prompt for the article number
read -p "Enter the article number: " article_number

# Find the article name based on the number
article_file=$(ls "${BLOG_DIR}${chosen_folder}/" | grep "^${article_number}-" | head -n 1)
if [[ -z "$article_file" ]]; then
    echo "No article found for the given number."
    exit 1
fi

# Choose Commit Type
echo "Choose Commit Type:"
commit_type=$(choose_option "Enter the number of your choice:" "${COMMIT_TYPES[@]}")

# Prompt for Commit Description
read -p "Enter a short description of the changes: " commit_description

# Generate Commit Message
commit_message="$commit_type($chosen_folder/$article_file): $commit_description"
echo -e "\nGenerated Commit Message:"
echo "$commit_message"

# Confirm and Execute Commit
read -p "Do you want to commit these changes? (y/n): " confirm
if [[ "$confirm" =~ ^[Yy]$ ]]; then
    git add "${BLOG_DIR}${chosen_folder}/${article_file}"
    git commit -m "$commit_message"
    echo "Changes committed successfully."
else
    echo "Commit cancelled."
fi
