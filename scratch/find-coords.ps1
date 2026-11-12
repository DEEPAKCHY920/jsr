Add-Type -AssemblyName System.Drawing

$p = "C:\Users\techn\.gemini\antigravity\brain\b004bd44-88a2-4f25-ac96-38233a3ae9d5\.user_uploaded\media_1794487170354_bbc8b128.jpg"
$img = [System.Drawing.Image]::FromFile($p)
$bmp = New-Object System.Drawing.Bitmap($img)

# Let's inspect coordinates of cards
# Total image is 1024 x 436.
# Row 1 cards: around y=125..215
# Row 2 cards: around y=230..320
# Let's check where the cards start and end horizontally
Write-Output "Image loaded successfully."
$bmp.Dispose()
$img.Dispose()

