import json
import re
from pathlib import Path

CHORD_RE = re.compile(r"^(?:[A-G](?:#|b)?(?:m|maj|min|dim|aug|sus|add|[0-9])*)"
                      r"(?:\s+[A-G](?:#|b)?(?:m|maj|min|dim|aug|sus|add|[0-9])*)*$")

def is_chord_line(line):
    """Return True if the line looks like a chord line."""
    line = line.strip()
    return bool(line) and bool(CHORD_RE.match(line))

def parse_txt_song(txt_path):
    """
    Reads a .txt file, parses metadata and lyrics,
    marks chord lines for bold rendering.
    """
    with open(txt_path, "r", encoding="utf-8") as f:
        lines = f.read().splitlines()

    metadata = {}
    lyrics_lines = []

    for line in lines:
        line = line.rstrip()

        # Skip empty lines at the top or comment lines
        if not line or line.strip().startswith("#"):
            continue

        # Metadata lines are in the form KEY: VALUE
        if ":" in line and line.split(":", 1)[0].isalpha():
            key, value = line.split(":", 1)
            metadata[key.strip().upper()] = value.strip()
        else:
            # Remaining lines are lyrics/chords
            lyrics_lines.append(line)

    # Mark chord lines
    processed_lines = []
    for line in lyrics_lines:
        processed_lines.append({
            "text": line,
            "is_chord": is_chord_line(line)
        })

    song = {
        "title": metadata.get("TITLE", txt_path.stem),
        "artist": metadata.get("ARTIST", ""),
        "key": metadata.get("KEY", ""),
        "capo": metadata.get("CAPO", ""),
        "tempo": metadata.get("TEMPO", ""),
        "genre": metadata.get("GENRE", ""),
        "lines": processed_lines
    }

    return song




def batch_txt_to_json(folder_path, output_json="songs.json"):
    folder = Path(folder_path)
    songs = []

    for txt_file in folder.glob("*.txt"):
        song = parse_txt_song(txt_file)
        songs.append(song)

    with open(output_json, "w", encoding="utf-8") as f:
        json.dump(songs, f, indent=2, ensure_ascii=False)

    print(f"Converted {len(songs)} files → {output_json}")

if __name__ == "__main__":
    import sys
    if len(sys.argv) < 2:
        print("Usage: python batch_convert.py <folder_path> [output_json]")
    else:
        folder = sys.argv[1]
        output_json = sys.argv[2] if len(sys.argv) > 2 else "songs.json"
        batch_txt_to_json(folder, output_json)
