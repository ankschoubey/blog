#!/bin/bash

# Base directories for blog posts and images
BLOG_DIR="src/content/post"
IMAGE_DIR="public/images"
DOMAIN="https://www.ankushchoubey.com"  # Set your domain here

# Function to check if a URL returns 404
check_url() {
    local url=$1
    status=$(curl -o /dev/null -s -w "%{http_code}" "$url")
    if [[ $status -eq 404 ]]; then
        echo "❌ 404: $url"
    else
        echo "✅ OK: $url"
    fi
}

# List folders and prompt user to choose one
echo "Choose Blog:"
folders=($(ls -d $BLOG_DIR/*/ | xargs -n 1 basename))

for i in "${!folders[@]}"; do
    echo "$((i + 1)): ${folders[i]}"
done

read -p "Enter the number of your choice: " folder_choice
chosen_folder="${folders[$((folder_choice - 1))]}"

# Prompt for the article number
read -p "Enter the article number: " article_number

# Find the article name based on the number
article_file=$(ls $BLOG_DIR/$chosen_folder/ | grep "^${article_number}-" | head -n 1)
if [[ -z "$article_file" ]]; then
    echo "No article found for the given number."
    exit 1
fi

article_path="$BLOG_DIR/$chosen_folder/$article_file"
echo "Analyzing: $article_path"

# Check frontmatter image
frontmatter_image=$(grep -oE '^image: (.+)$' "$article_path" | awk '{print $2}')
if [[ -n $frontmatter_image ]]; then
    local_image="$IMAGE_DIR/${frontmatter_image#/images/}"
    if [[ -f "$local_image" ]]; then
        echo "✅ Found frontmatter image: $local_image"
    else
        echo "❌ Missing frontmatter image: $local_image"
    fi
else
    echo "No frontmatter image found."
fi

# Extract images and links from the article
images=($(grep -oE '!\[.*?\]\(([^)]+)\)' "$article_path" | awk -F'[()]' '{print $2}'))
web_links=($(grep -oE '\[.*?\]\((http[^)]+)\)' "$article_path" | awk -F'[()]' '{print $2}'))
local_links=($(grep -oE '\]\(/[^)]+\)' "$article_path" | awk -F'[()]' '{print $2}'))

echo -e "\nChecking Images:"
for image in "${images[@]}"; do
    if [[ $image == http* ]]; then
        check_url "$image"
    else
        local_image="$IMAGE_DIR/${image#/images/}"
        if [[ -f "$local_image" ]]; then
            echo "✅ Found local image: $local_image"
        else
            echo "❌ Missing local image: $local_image"
        fi
    fi
done

echo -e "\nChecking Web Links:"
for link in "${web_links[@]}"; do
    check_url "$link"
done

echo -e "\nChecking Local Links:"
for local_link in "${local_links[@]}"; do
    full_url="${DOMAIN}${local_link}"
    check_url "$full_url"
done

# Check slug-based link
slug="${article_file%.mdx}"  # Remove .mdx extension
slug="${slug#*-}"           # Remove the number prefix
custom_link="${DOMAIN}/${chosen_folder}/${slug}"

echo -e "\nChecking slug-based link:"
check_url "$custom_link"
