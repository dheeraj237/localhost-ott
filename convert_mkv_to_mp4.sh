# Function to convert MKV to MP4

# Check if ffmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
    echo "Error: ffmpeg is not installed. Please install ffmpeg and try again."
    return 1
fi
# Get the input file or directory path from first argument
local directory="$PWD"

# Check if directory exists
if [ ! -d "$directory" ]; then
    echo "Error: Directory '$directory' does not exist."
    return 1
fi

# Loop through all files in the directory
for file in "$directory"/*.mkv; do
    # Get the filename without extension
    filename=$(basename "$file" .mkv)

    # Construct output filename
    output_file="$directory/$filename.mp4"

    # Display conversion message
    echo "Converting: $file -> $output_file"

    # Check audio codec using ffprobe
    audio_codec=$(ffprobe -show_format -show_streams -v quiet -of json "$file" 2>/dev/null | jq -r '.streams[].codec_name')

    # Choose conversion command based on audio codec
    if [[ "$audio_codec" == *"aac"* ]]; then
        ffmpeg -i "$file" -codec copy "$output_file" &> /dev/null
    else
        echo "Need codec convertion too for $file"
        ffmpeg -i "$file" -c:v libx264 -c:a aac -b:v 2M -strict -2 -aac_profile:v main "$output_file" &> /dev/null
    fi

    # Check for ffmpeg errors (exit code of the background process)
    if [ $? -ne 0 ]; then
        echo "Error: ffmpeg conversion failed for $file."
    fi

    echo "=========================="

    # Move the original MKV file to the "converted" directory and create it if it doesn't exist
    mkdir -p "$directory/converted"
    mv "$file" "$directory/converted"
done

echo "Conversion completed for all MKV files in '$directory'."