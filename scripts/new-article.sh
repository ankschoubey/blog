#!/bin/bash

# Set the base directory for blog posts
BLOG_DIR="src/content/post/"

# List folders and prompt user to choose one
echo "Choose Blog:"
folders=($(ls -d $BLOG_DIR*/ | xargs -n 1 basename))

for i in "${!folders[@]}"; do
    echo "$((i + 1)): ${folders[i]}"
done

read -p "Enter the number of your choice: " folder_choice
chosen_folder="${folders[$((folder_choice - 1))]}"
chosen_path="${BLOG_DIR}${chosen_folder}/"

# Find the last numbered file
last_file=$(ls $chosen_path | grep -E '^[0-9]+-' | sort -V | tail -n 1)

if [[ -n "$last_file" ]]; then
    last_number=$(echo $last_file | cut -d'-' -f1)
else
    last_number=0
fi

new_number=$((last_number + 1))
echo "This will be ${new_number} blog post in '${chosen_folder}'"

# Prompt for title and slug
read -p "Title: " title
read -p "Excerpt: " excerpt
read -p "Slug: " slug

# Ask if user wants to add an image
read -p "Add image? y/n: " add_image

# Set the image path if selected
if [[ "$add_image" == "y" ]]; then
    image_path="/images/${chosen_folder}/${slug}.png"
else
    image_path=""
fi

# Get the current date in the desired format: 2024-09-28T20:52:08.052481
current_date=$(date +"%Y-%m-%dT%H:%M:%S")
microseconds=$(printf "%06d" $(($RANDOM % 1000000)))

# Combine date and microseconds
current_date="${current_date}.${microseconds}"

# Create the new blog file
new_file="${new_number}-${slug}.mdx"
new_filepath="${chosen_path}${new_file}"

cat <<EOF > "$new_filepath"
---
title: $title
excerpt: $excerpt
slug: /${chosen_folder}/${slug}/
image: $image_path
tags:
    - technical
    - non-technical
publishDate: $current_date
gpt: chatgpt url
trello: ""
---
EOF

echo "New blog post created: $new_filepath"
