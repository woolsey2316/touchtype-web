#!/bin/bash

# Loop through all .woff files in the current directory
for file in *.woff; do
    # Skip if no .woff files exist
    [ -e "$file" ] || continue

    # Strip extension to get the font name
    fontname="${file%.woff}"

    # Determine font weight based on filename
    lowername=$(echo "$fontname" | tr '[:upper:]' '[:lower:]')

    if [[ "$lowername" == *"regular"* ]]; then
        fontWeight=400
    elif [[ "$lowername" == *"medium"* ]]; then
        fontWeight=500
    elif [[ "$lowername" == *"bold"* ]]; then
        fontWeight=600
    else
        fontWeight=400
    fi

    # Output CSS file name
    cssfile="${fontname}.css"

    # Write the @font-face block
    cat > "$cssfile" <<EOF
@font-face {
  font-family: "${fontname}";
  src: url("/fonts/${fontname}.woff") format("woff");
  font-weight: ${fontWeight};
  font-style: normal;
  font-display: swap;
}
EOF

    echo "Generated: $cssfile (weight: $fontWeight)"
done
