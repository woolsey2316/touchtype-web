#!/bin/bash

for file in *; do
  # Check if the item is a regular file (not a directory)
  if [ -f "$file" ]; then
    echo "$file"
  fi
done
