@echo off
setlocal enabledelayedexpansion

set "OUTPUT_FILE=%~dp0file_list.txt"

:: Clear or create the output file
> "%OUTPUT_FILE%" echo.

:: Loop through each subfolder in the current directory
for /d %%D in (*) do (
    :: Write folder name
    >> "%OUTPUT_FILE%" echo %%D
    >> "%OUTPUT_FILE%" echo.

    :: Check if the folder contains any files
    set "HAS_FILES=0"
    for %%F in ("%%D\*.*") do (
        set "HAS_FILES=1"
    )

    if "!HAS_FILES!"=="1" (
        :: Write each file with bullet point
        for %%F in ("%%D\*.*") do (
            >> "%OUTPUT_FILE%" echo * %%~nxF
        )
    ) else (
        >> "%OUTPUT_FILE%" echo * (no files^)
    )

    :: Write end marker and blank line
    >> "%OUTPUT_FILE%" echo * ~
    >> "%OUTPUT_FILE%" echo.
)

echo Done! Output written to: %OUTPUT_FILE%
pause