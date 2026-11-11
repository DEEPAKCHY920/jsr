Add-Type -AssemblyName System.Drawing

$favPath = "D:\jsr\frontend\public\favicon.png"
$src = [System.Drawing.Image]::FromFile($favPath)

$sizes = @(
    @{ Name = "favicon-16x16.png"; Size = 16 },
    @{ Name = "favicon-32x32.png"; Size = 32 },
    @{ Name = "apple-touch-icon.png"; Size = 180 },
    @{ Name = "android-chrome-192x192.png"; Size = 192 },
    @{ Name = "android-chrome-512x512.png"; Size = 512 }
)

foreach ($item in $sizes) {
    $s = $item.Size
    $dest = "D:\jsr\frontend\public\" + $item.Name
    $bmp = New-Object System.Drawing.Bitmap($s, $s)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

    $g.DrawImage($src, 0, 0, $s, $s)
    $bmp.Save($dest, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $bmp.Dispose()
    Write-Output "Generated $dest"
}

$src.Dispose()

