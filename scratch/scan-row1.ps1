Add-Type -AssemblyName System.Drawing

$row1 = [System.Drawing.Bitmap]::FromFile("D:\jsr\scratch\row1.png")
# Scan across row1 at y=40 (inside the card image area)
# Cards have white backgrounds and light borders / shadows
for ($x = 10; $x -lt 730; $x += 5) {
    # Let's count non-white / content pixels vertically in range y=10..60
    $contentPixels = 0
    for ($y = 10; $y -lt 70; $y += 2) {
        $c = $row1.GetPixel($x, $y)
        # If color is not near pure white (#FFFFFF or #F5F8FF)
        if ($c.R -lt 240 -or $c.G -lt 240 -or $c.B -lt 240) {
            $contentPixels++
        }
    }
    if ($contentPixels -gt 5) {
        Write-Output "x=$x : content=$contentPixels"
    }
}
$row1.Dispose()

