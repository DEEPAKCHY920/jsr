Add-Type -AssemblyName System.Drawing

$img = [System.Drawing.Bitmap]::FromFile("D:\jsr\frontend\public\parts\motor.png")
Write-Output "Motor size: $($img.Width)x$($img.Height)"
# Check bottom row of pixels: y=59
for ($x = 0; $x -lt $img.Width; $x += 10) {
    $c = $img.GetPixel($x, 59)
    Write-Output "x=$x y=59: R=$($c.R) G=$($c.G) B=$($c.B)"
}
$img.Dispose()
