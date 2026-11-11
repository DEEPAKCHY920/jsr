Add-Type -AssemblyName System.Drawing

$srcPath = "D:\jsr\frontend\public\shop.jpg"
$dstPath = "D:\jsr\frontend\public\og-image.jpg"

$srcImage = [System.Drawing.Image]::FromFile($srcPath)
Write-Output "Original Size: $($srcImage.Width) x $($srcImage.Height)"

$targetWidth = 1200
$targetHeight = 630

# High quality resize with aspect-fill center crop
$srcWidth = $srcImage.Width
$srcHeight = $srcImage.Height

$srcRatio = $srcWidth / $srcHeight
$targetRatio = $targetWidth / $targetHeight

$cropWidth = $srcWidth
$cropHeight = $srcHeight
$cropX = 0
$cropY = 0

if ($srcRatio -gt $targetRatio) {
    # Source is wider than 1200:630 -> crop sides
    $cropWidth = [int]($srcHeight * $targetRatio)
    $cropX = [int](($srcWidth - $cropWidth) / 2)
} else {
    # Source is taller than 1200:630 -> crop top/bottom
    $cropHeight = [int]($srcWidth / $targetRatio)
    $cropY = [int](($srcHeight - $cropHeight) / 2)
}

$bmp = New-Object System.Drawing.Bitmap($targetWidth, $targetHeight)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

$srcRect = New-Object System.Drawing.Rectangle($cropX, $cropY, $cropWidth, $cropHeight)
$dstRect = New-Object System.Drawing.Rectangle(0, 0, $targetWidth, $targetHeight)

$g.DrawImage($srcImage, $dstRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)

# Save as high quality JPEG
$encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.FormatDescription -eq "JPEG" }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 90L)

$bmp.Save($dstPath, $encoder, $encoderParams)

$g.Dispose()
$bmp.Dispose()
$srcImage.Dispose()

Write-Output "Created $dstPath (1200x630)"

