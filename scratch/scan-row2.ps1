Add-Type -AssemblyName System.Drawing

$row2 = [System.Drawing.Bitmap]::FromFile("D:\jsr\scratch\row2.png")
# Scan across row2 at y=40 (inside the card image area)
for ($x = 40; $x -lt 730; $x += 5) {
    $contentPixels = 0
    for ($y = 10; $y -lt 70; $y += 2) {
        $c = $row2.GetPixel($x, $y)
        if ($c.R -lt 240 -or $c.G -lt 240 -or $c.B -lt 240) {
            $contentPixels++
        }
    }
    if ($contentPixels -gt 5) {
        Write-Output "x=$x : content=$contentPixels"
    }
}
$row2.Dispose()

