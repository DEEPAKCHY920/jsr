Add-Type -AssemblyName System.Drawing

$p = "C:\Users\techn\.gemini\antigravity\brain\b004bd44-88a2-4f25-ac96-38233a3ae9d5\.user_uploaded\media_1794487170354_bbc8b128.jpg"
$img = [System.Drawing.Bitmap]::FromFile($p)

# Scan vertically around Motor center x=90
for ($y = 110; $y -lt 240; $y += 2) {
    $c = $img.GetPixel(90, $y)
    Write-Output "y=$y : R=$($c.R) G=$($c.G) B=$($c.B)"
}
$img.Dispose()
