#!/bin/bash

# Set the base directory for images
BASE_IMAGE_DIR="public/images"

# Prompt for the image file path
read -p "Provide the file path of the image: " image_path

# Remove any surrounding quotes from the file path
image_path=$(echo $image_path | sed 's/^["'\''"]//;s/["'\''"]$//')

# Check if the file exists
if [[ ! -f "$image_path" ]]; then
    echo "File does not exist. Please provide a valid file path."
    exit 1
fi

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

# Ask for a description and file name
read -p "What is this file about (SEO optimized): " description
read -p "Enter the file name (without extension): " file_name

# Get the file extension
file_extension="${image_path##*.}"

# Replace spaces and underscores with hyphens
description=$(echo "$description" | sed 's/[ _]/-/g')
file_name=$(echo "$file_name" | sed 's/[ _]/-/g')

# Create the destination path
destination_path="${BASE_IMAGE_DIR}/${chosen_folder}/${article_slug}/${file_name}.${file_extension}"

# Create the necessary directory
mkdir -p "$(dirname "$destination_path")"

# Copy the file to the destination
cp "$image_path" "$destination_path"

# Output the markdown reference
echo "![${description}](/images/${chosen_folder}/${article_slug}/${file_name}.${file_extension})"
