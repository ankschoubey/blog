#!/bin/bash

# Print the count of .md and .mdx files before the operation
initial_count=$(find . -type f \( -name "*.md" -o -name "*.mdx" \) | wc -l)
echo "Initial count of .md and .mdx files: $initial_count"

# Create a temporary file to store the list of .md and .mdx files
temp_file=$(mktemp)

# Find all .md and .mdx files and store them in the temporary file
find . -type f \( -name "*.md" -o -name "*.mdx" \) -print0 > "$temp_file"

# Create an array to hold file paths and their publishDate
declare -a files_with_dates

# Read the files and extract publishDate
while IFS= read -r -d '' file; do
  # Extract publishDate from the file's frontmatter
  publish_date=$(grep -m 1 '^publishDate:' "$file" | awk '{print $2}')
  if [ -n "$publish_date" ]; then
    files_with_dates+=("$publish_date|$file")
  fi
done < "$temp_file"

# Sort files by publishDate
sorted_files=($(for entry in "${files_with_dates[@]}"; do
  echo "$entry"
done | sort))

# Index and move files to the current directory
index=1
for entry in "${sorted_files[@]}"; do
  file=$(echo "$entry" | awk -F'|' '{print $2}')
  base_name="$(basename "$file")"
  new_name="${index}-${base_name}"
  mv "$file" "./$new_name"
  ((index++))
done

# Clean up the temporary file
rm "$temp_file"

# Print the count of .md and .mdx files after the operation
final_count=$(find . -type f \( -name "*.md" -o -name "*.mdx" \) | wc -l)
echo "Final count of .md and .mdx files: $final_count"

# Check and delete empty directories
empty_dirs=$(find . -type d -empty)
if [ -n "$empty_dirs" ]; then
  echo "Deleting empty directories:"
  echo "$empty_dirs"
  find . -type d -empty -delete
else
  echo "No empty directories to delete."
fi
