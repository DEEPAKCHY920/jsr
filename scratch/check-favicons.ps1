Add-Type -AssemblyName System.Drawing

$favPath = "D:\jsr\frontend\public\favicon.png"
if (Test-Path $favPath) {
    $img = [System.Drawing.Image]::FromFile($favPath)
    Write-Output "favicon.png size: $($img.Width)x$($img.Height)"
    $img.Dispose()
}

$logoPath = "D:\jsr\frontend\public\jsr-logo.png"
if (Test-Path $logoPath) {
    $img = [System.Drawing.Image]::FromFile($logoPath)
    Write-Output "jsr-logo.png size: $($img.Width)x$($img.Height)"
    $img.Dispose()
}

