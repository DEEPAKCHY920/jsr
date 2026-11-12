Add-Type -AssemblyName System.Drawing

$p = "C:\Users\techn\.gemini\antigravity\brain\b004bd44-88a2-4f25-ac96-38233a3ae9d5\.user_uploaded\media_1794487170354_bbc8b128.jpg"
$img = [System.Drawing.Image]::FromFile($p)
$bmp = New-Object System.Drawing.Bitmap($img)

# Let's check card widths and centers
# On 1024 width:
# 7 cards across: 
# Let's crop a strip for row 1 and row 2 to see exact positions
function Crop($name, $x, $y, $w, $h) {
    $cropBmp = New-Object System.Drawing.Bitmap($w, $h)
    $g = [System.Drawing.Graphics]::FromImage($cropBmp)
    $srcRect = New-Object System.Drawing.Rectangle($x, $y, $w, $h)
    $dstRect = New-Object System.Drawing.Rectangle(0, 0, $w, $h)
    $g.DrawImage($bmp, $dstRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
    $cropBmp.Save("D:\jsr\scratch\" + $name + ".png", [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $cropBmp.Dispose()
}

Crop "row1" 0 120 740 100
Crop "row2" 0 220 740 100
Crop "rickshaw" 730 90 280 230

$bmp.Dispose()
$img.Dispose()
Write-Output "Strips cropped."
