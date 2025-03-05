#!/bin/bash

# Set the base directory for images
BASE_IMAGE_DIR="public/images"

# List folders and prompt user to choose one
echo "Choose Blog:"
folders=($(ls -d src/content/post/*/ | xargs -n 1 basename))

for i in "${!folders[@]}"; do
    echo "$((i + 1)): ${folders[i]}"
done

read -p "Enter the number of your choice: " folder_choice
chosen_folder="${folders[$((folder_choice - 1))]}"

# Prompt for the article number
read -p "Enter the article number: " article_number

# Find the article name based on the number
article_file=$(ls src/content/post/$chosen_folder/ | grep "^${article_number}-" | head -n 1)
if [[ -z "$article_file" ]]; then
    echo "No article found for the given number."
    exit 1
fi

article_name="${article_file%.mdx}"  # Remove the .mdx extension
article_slug="${article_name}"    # Remove the number prefix

# Construct the image folder path
image_folder_path="${BASE_IMAGE_DIR}/${chosen_folder}/${article_slug}"

# Check if the folder exists
if [[ ! -d "$image_folder_path" ]]; then
    echo "Image folder does not exist: $image_folder_path"
    exit 1
fi

# Open the folder in Finder
open "$image_folder_path"

echo "Opened image folder: $image_folder_path"
