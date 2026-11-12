Add-Type -AssemblyName System.Drawing

$p = "C:\Users\techn\.gemini\antigravity\brain\b004bd44-88a2-4f25-ac96-38233a3ae9d5\.user_uploaded\media_1794487170354_bbc8b128.jpg"
$img = [System.Drawing.Bitmap]::FromFile($p)

$outDir = "D:\jsr\frontend\public\parts"
if (-not (Test-Path $outDir)) {
    New-Item -ItemType Directory -Path $outDir | Out-Null
}

$items = @(
    # Row 1 (y_top=130, height=58, width=70)
    @{ name = "motor"; cx = 90; cy = 158; w = 74; h = 60 },
    @{ name = "controller"; cx = 193; cy = 158; w = 74; h = 60 },
    @{ name = "battery-charger"; cx = 302; cy = 158; w = 74; h = 60 },
    @{ name = "differential"; cx = 402; cy = 158; w = 74; h = 60 },
    @{ name = "brake-shoes"; cx = 505; cy = 158; w = 74; h = 60 },
    @{ name = "shocker"; cx = 603; cy = 158; w = 74; h = 60 },
    @{ name = "tyres"; cx = 693; cy = 158; w = 74; h = 60 },

    # Row 2 (y_top=230, height=58, width=70)
    @{ name = "wiring-kit"; cx = 125; cy = 258; w = 74; h = 60 },
    @{ name = "dc-converter"; cx = 230; cy = 258; w = 74; h = 60 },
    @{ name = "headlight"; cx = 335; cy = 258; w = 74; h = 60 },
    @{ name = "tail-light"; cx = 440; cy = 258; w = 74; h = 60 },
    @{ name = "accelerator"; cx = 550; cy = 258; w = 74; h = 60 },
    @{ name = "battery-packs"; cx = 655; cy = 258; w = 74; h = 60 }
)

foreach ($item in $items) {
    $x = [int]($item.cx - $item.w / 2)
    $y = [int]($item.cy - $item.h / 2)
    $w = [int]$item.w
    $h = [int]$item.h

    # We can save at 2x resolution or crisp bitmap
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
    Write-Output "Saved $destPath ($w x $h)"
}

# Also crop the right-side blue e-rickshaw
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

$rickshawPath = "$outDir\blue-erickshaw.png"
$rickshawBmp.Save($rickshawPath, [System.Drawing.Imaging.ImageFormat]::Png)
$rg.Dispose()
$rickshawBmp.Dispose()
Write-Output "Saved $rickshawPath"

$img.Dispose()
