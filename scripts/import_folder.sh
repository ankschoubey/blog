#!/bin/bash

# --- Configuration ---
ADDITIONAL_TAG="cli-imported"
LOG_DIR="logs"
LOG_FILE="$LOG_DIR/batch_import_$(date +%Y%m%d_%H%M%S).log"
ERROR_LOG_FILE="$LOG_DIR/batch_import_errors_$(date +%Y%m%d_%H%M%S).log"

# --- Interactive Folder Selection ---
echo "Choose Blog Folder to import:"
folders=($(ls -d src/content/post/*/ | xargs -n 1 basename))

for i in "${!folders[@]}"; do
  echo "$((i + 1)): ${folders[i]}"
done

read -p "Enter the number of your choice: " folder_choice
BLOG_FOLDER="${folders[$((folder_choice - 1))]}"

# --- Setup ---
# Create the logs directory if it doesn't exist
mkdir -p "$LOG_DIR"

# Clear previous log files (optional, you can comment these out if you want to append)
>"$LOG_FILE"
>"$ERROR_LOG_FILE"

# --- Initial Logging ---
echo "--- Starting batch import for folder: '$BLOG_FOLDER' ---" | tee -a "$LOG_FILE"
echo "Logs will be written to: $LOG_FILE" | tee -a "$LOG_FILE"
echo "Errors will be written to: $ERROR_LOG_FILE" | tee -a "$LOG_FILE"
echo "-------------------------------------------------------------------" | tee -a "$LOG_FILE"

# --- Main Loop ---
echo "--- DEBUG: Files before sorting ---" | tee -a "$LOG_FILE"
find src/content/post/"$BLOG_FOLDER" -maxdepth 1 -type f \( -name "*.md" -o -name "*.mdx" \) -print | awk -F'/' '{print $NF}' | tee -a "$LOG_FILE"
echo "--- END DEBUG ---" | tee -a "$LOG_FILE"

all_filenames=($(find src/content/post/"$BLOG_FOLDER" -maxdepth 1 -type f \( -name "*.md" -o -name "*.mdx" \) -print | awk -F'/' '{print $NF}'))

sorted_filenames=($(printf "%s\n" "${all_filenames[@]}" | sort -n -t'-' -k1,1))

sorted_files=()
for filename in "${sorted_filenames[@]}"; do
  sorted_files+=("src/content/post/$BLOG_FOLDER/$filename")
done

echo "--- DEBUG: Files after sorting (filenames only) ---" | tee -a "$LOG_FILE"
for f in "${sorted_files[@]}"; do
  echo "$(basename "$f")" | tee -a "$LOG_FILE"
done
echo "--- END DEBUG ---" | tee -a "$LOG_FILE"

# Loop through the sorted files
for FILE_PATH in "${sorted_files[@]}"; do
  # Check if the file actually exists (handles cases where no .mdx files are found)
  if [ ! -f "$FILE_PATH" ]; then
    echo "No .md/.mdx files found in 'src/content/post/$BLOG_FOLDER'. Exiting loop." | tee -a "$LOG_FILE"
    break
  fi

  # Extract the filename (e.g., "101-testing-design-patterns.mdx")
  FILE_NAME=$(basename "$FILE_PATH")

  # Extract the article number from the filename (e.g., "101")
  # This assumes your files are named like "NUMBER-title.mdx"
  ARTICLE_NUMBER=$(echo "$FILE_NAME" | cut -d'-' -f1)

  echo "Processing article: $FILE_NAME (Number: $ARTICLE_NUMBER)" | tee -a "$LOG_FILE"

  # Run your import script, redirecting stdout to LOG_FILE and stderr to ERROR_LOG_FILE
  # The 'tee -a' command ensures output also goes to the console
  ./scripts/import-to-dayone.sh "$BLOG_FOLDER" "$ARTICLE_NUMBER" "$ADDITIONAL_TAG" >>"$LOG_FILE" 2>>"$ERROR_LOG_FILE"

  # Check the exit status of the last command (import-to-dayone.sh)
  if [ $? -eq 0 ]; then
    echo "  -> SUCCESS" | tee -a "$LOG_FILE"
  else
    echo "  -> FAILED (Check $ERROR_LOG_FILE for details)" | tee -a "$LOG_FILE"
  fi
  echo "-------------------------------------------------------------------" | tee -a "$LOG_FILE"
done

# --- Final Summary ---
echo "Batch import complete for folder: '$BLOG_FOLDER'." | tee -a "$LOG_FILE"
echo "Summary: Check $LOG_FILE for full details and $ERROR_LOG_FILE for any errors." | tee -a "$LOG_FILE"
