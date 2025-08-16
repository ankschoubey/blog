#!/bin/bash

# Function to display usage
usage() {
  echo "Usage: $0"
  exit 1
}

# --- File Selection ---

chosen_folder=""
article_file=""

# Check if arguments are provided
if [ -n "$1" ] && [ -n "$2" ]; then
  # Arguments are provided, try to use them
  temp_folder="src/content/post/$1"
  if [ -d "$temp_folder" ]; then
    temp_article_name=$(ls "$temp_folder/" | grep "^$2-" | head -n 1)
    if [ -n "$temp_article_name" ]; then
      chosen_folder="$1"
      article_file_name="$temp_article_name"
      article_file="$temp_folder/$article_file_name"
      echo "Using provided arguments: Blog='$chosen_folder', Article Number='$2'"
    fi
  fi
fi

# If variables are not set from arguments, show the menu
if [ -z "$chosen_folder" ]; then
  if [ -z "$1" ]; then # Only show menu if no arguments were passed
    echo "No arguments provided, showing interactive menu."
  else
    echo "Invalid arguments provided, showing interactive menu."
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
  article_file_name=$(ls "src/content/post/$chosen_folder/" | grep "^${article_number}-" | head -n 1)
  if [[ -z "$article_file_name" ]]; then
    echo "No article found for the given number."
    exit 1
  fi

  article_file="src/content/post/$chosen_folder/$article_file_name"
fi

if [[ ! -f "$article_file" ]]; then
  echo "File does not exist."
  exit 1
fi

# --- Parsing the markdown file ---

# Extract frontmatter (lines between ---)
frontmatter=$(sed -n '/^---$/,/^---$/p' "$article_file" | sed '1d;$d')

# Extract values from frontmatter
title=$(echo "$frontmatter" | grep "^title:" | sed 's/title: //;s/"//g')
description=$(echo "$frontmatter" | grep "^excerpt:" | sed 's/excerpt: //;s/"//g') # Changed to excerpt
publishDate=$(echo "$frontmatter" | grep "^publishDate:" | sed 's/publishDate: //;s/"//g')
tags=$(echo "$frontmatter" | grep "^tags:" | sed 's/tags: //;s/\[//;s/\]//;s/,//g')
slug=$(echo "$frontmatter" | grep "^slug:" | sed 's/slug: //')

# Fallback to generating slug from filename if not in frontmatter
if [ -z "$slug" ]; then
  slug_from_filename=$(basename "$article_file" .mdx)
  slug="/$chosen_folder/$slug_from_filename"
fi

# Extract markdown content (everything after the second ---)
markdown_content=$(awk '  /^---$/ { count++ }   count == 2 && !/^---$/ { print }' "$article_file")

# Clean the markdown content
# Remove import statements as they are not valid in Day One
markdown_content=$(echo "$markdown_content" | sed '/^import/d')

# --- Image Processing ---

# Get image from frontmatter
frontmatter_image=$(echo "$frontmatter" | grep "^image:" | sed 's/image: //')
if [ -n "$frontmatter_image" ]; then
  frontmatter_image_path="public$frontmatter_image"
fi

# Find all image paths in the markdown content
body_images=($(printf "%s" "$markdown_content" | grep -o '!\[.*\]([^)]*)' | grep -v 'http[s]*://' | sed 's/!\[.*\](\(.*\))/public\1/g'))

# Combine all image paths and remove duplicates
all_image_paths_temp=""
if [ -n "$frontmatter_image_path" ]; then
  all_image_paths_temp+="$frontmatter_image_path\n"
fi
for img_path in "${body_images[@]}"; do
  all_image_paths_temp+="$img_path\n"
done

image_paths=($(echo -e "$all_image_paths_temp" | sort -u))

# Prepare photo assets for dayone CLI
cwd=$(pwd)
photo_assets_string=""
if [ ${#image_paths[@]} -gt 0 ]; then
  photo_assets_string="--attachments"
  for img_path in "${image_paths[@]}"; do
    clean_path=$(echo "$img_path" | xargs)
    absolute_path="$cwd/$clean_path"
    if [ -f "$absolute_path" ]; then
      photo_assets_string+=" $absolute_path"
    else
      echo "Warning: Image not found at '$absolute_path'"
    fi
  done
fi

# --- Prepare and Execute Day One Entry ---

# Format the date for dayone cli
publishDate_without_ms=$(echo "$publishDate" | cut -d. -f1)
formatted_date=$(date -j -f "%Y-%m-%dT%H:%M:%S" "$publishDate_without_ms" "+%Y-%m-%d %H:%M:%S")

# Process tags into an array for robust handling
tags_array=()
while IFS= read -r line; do
  tags_array+=("$line")
done < <(awk '/^tags:/{f=1;next} /^[^ ]/{f=0} f==1{gsub(/  - /,""); print}' "$article_file")
tags_array+=("$chosen_folder")
tags_array+=("cli-imported")

# Construct the entry text in a variable
header=$(printf "# 🌐%s\n\n%s\n\n*%s*\n\n---\n\n" "$title" "[${slug}](https://www.ankushchoubey.com${slug})" "$description")
markdown_body=$(awk 'BEGIN{p=0} /^---$/{p++; next} p>=2' "$article_file" | sed '/^import.*;$/d' | sed '/!\[.*\]([^)]*)/d')
link_at_end=$(printf "\n\n---\n\n%s" "[${slug}](https://www.ankushchoubey.com${slug})")
full_entry_text="$header$markdown_body$link_at_end\n\nFilename: $article_file_name"

echo "Importing to Day One..."

# Pass the entry text as an argument and tags as a proper array
dayone2 new "$full_entry_text" --journal "cli-import" --tags "${tags_array[@]}" --date "$formatted_date" $photo_assets_string

echo "Import complete."
