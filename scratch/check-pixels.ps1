Add-Type -AssemblyName System.Drawing

$img = [System.Drawing.Image]::FromFile("D:\jsr\frontend\public\jsr-logo-footer.png")
$bmp = New-Object System.Drawing.Bitmap($img)
Write-Output "Pixel (0,0): $($bmp.GetPixel(0,0))"
Write-Output "Pixel (w/2, h/2): $($bmp.GetPixel([int]($img.Width/2), [int]($img.Height/2)))"
$bmp.Dispose()
$img.Dispose()

$img2 = [System.Drawing.Image]::FromFile("D:\jsr\frontend\public\jsr-logo-white.png")
$bmp2 = New-Object System.Drawing.Bitmap($img2)
Write-Output "White Logo Pixel (0,0): $($bmp2.GetPixel(0,0))"
Write-Output "White Logo Pixel (w/2, h/2): $($bmp2.GetPixel([int]($img2.Width/2), [int]($img2.Height/2)))"
$bmp2.Dispose()
$img2.Dispose()

