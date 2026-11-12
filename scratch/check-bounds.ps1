Add-Type -AssemblyName System.Drawing

$img = [System.Drawing.Image]::FromFile("D:\jsr\frontend\public\jsr-logo-footer.png")
$bmp = New-Object System.Drawing.Bitmap($img)

$minX = $img.Width
$maxX = 0
$minY = $img.Height
$maxY = 0

for ($y = 0; $y -lt $img.Height; $y += 2) {
    for ($x = 0; $x -lt $img.Width; $x += 2) {
        $pixel = $bmp.GetPixel($x, $y)
        if ($pixel.A -gt 10) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

Write-Output "Image size: $($img.Width) x $($img.Height)"
Write-Output "Content bounds: X=$minX..$maxX (Width=$($maxX - $minX)), Y=$minY..$maxY (Height=$($maxY - $minY))"

$bmp.Dispose()
$img.Dispose()

