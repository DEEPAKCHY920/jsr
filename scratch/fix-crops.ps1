Add-Type -AssemblyName System.Drawing

$p = "C:\Users\techn\.gemini\antigravity\brain\b004bd44-88a2-4f25-ac96-38233a3ae9d5\.user_uploaded\media_1794487170354_bbc8b128.jpg"
$img = [System.Drawing.Bitmap]::FromFile($p)

$outDir = "D:\jsr\frontend\public\parts"

# Row 1 items (cy=156, h=52, w=70)
$row1 = @(
    @{ name = "motor"; cx = 90; cy = 156; w = 70; h = 50 },
    @{ name = "controller"; cx = 193; cy = 156; w = 70; h = 50 },
    @{ name = "battery-charger"; cx = 302; cy = 156; w = 70; h = 50 },
    @{ name = "differential"; cx = 402; cy = 156; w = 70; h = 50 },
    @{ name = "brake-shoes"; cx = 505; cy = 156; w = 70; h = 50 },
    @{ name = "shocker"; cx = 603; cy = 156; w = 70; h = 50 },
    @{ name = "tyres"; cx = 693; cy = 156; w = 70; h = 50 }
)

# Row 2 items (cy=251, h=48, w=70) - cleanly cuts above the text labels!
$row2 = @(
    @{ name = "wiring-kit"; cx = 125; cy = 250; w = 70; h = 46 },
    @{ name = "dc-converter"; cx = 230; cy = 250; w = 70; h = 46 },
    @{ name = "headlight"; cx = 335; cy = 250; w = 70; h = 46 },
    @{ name = "tail-light"; cx = 440; cy = 250; w = 70; h = 46 },
    @{ name = "accelerator"; cx = 550; cy = 250; w = 70; h = 46 },
    @{ name = "battery-packs"; cx = 655; cy = 250; w = 70; h = 46 }
)

$allItems = $row1 + $row2

foreach ($item in $allItems) {
    $x = [int]($item.cx - $item.w / 2)
    $y = [int]($item.cy - $item.h / 2)
    $w = [int]$item.w
    $h = [int]$item.h

    $cropBmp = New-Object System.Drawing.Bitmap($w, $h)
    $g = [System.Drawing.Graphics]::FromImage($cropBmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

    $srcRect = New-Object System.Drawing.Rectangle($x, $y, $w, $h)
    $dstRect = New-Object System.Drawing.Rectangle(0, 0, $w, $h)
    $g.DrawImage($img, $dstRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)

    $destPath = "$outDir\" + $item.name + ".png"
    $cropBmp.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)

    $g.Dispose()
    $cropBmp.Dispose()
}

# Blue e-rickshaw
$rickshawW = 275
$rickshawH = 225
$rickshawX = 740
$rickshawY = 95
$rickshawBmp = New-Object System.Drawing.Bitmap($rickshawW, $rickshawH)
$rg = [System.Drawing.Graphics]::FromImage($rickshawBmp)
$rg.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$rg.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$rg.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

$rSrcRect = New-Object System.Drawing.Rectangle($rickshawX, $rickshawY, $rickshawW, $rickshawH)
$rDstRect = New-Object System.Drawing.Rectangle(0, 0, $rickshawW, $rickshawH)
$rg.DrawImage($img, $rDstRect, $rSrcRect, [System.Drawing.GraphicsUnit]::Pixel)

# Fill the "n one place." text area with the surrounding background color
$skyColor = $rickshawBmp.GetPixel(85, 10)
$brush = New-Object System.Drawing.SolidBrush($skyColor)
$rg.FillRectangle($brush, 0, 0, 80, 28)
$brush.Dispose()

$rickshawPath = "$outDir\blue-erickshaw.png"
$rickshawBmp.Save($rickshawPath, [System.Drawing.Imaging.ImageFormat]::Png)
$rg.Dispose()
$rickshawBmp.Dispose()

$img.Dispose()
Write-Output "Successfully updated all crops cleanly."
