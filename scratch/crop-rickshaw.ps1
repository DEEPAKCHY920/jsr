Add-Type -AssemblyName System.Drawing

$p = "C:\Users\techn\.gemini\antigravity\brain\b004bd44-88a2-4f25-ac96-38233a3ae9d5\.user_uploaded\media_1794487170354_bbc8b128.jpg"
$img = [System.Drawing.Bitmap]::FromFile($p)

# Let's crop the blue e-rickshaw cleanly:
# On the right side, the rickshaw starts around x=740 and goes to x=1015, y=95 to y=320.
$cropBmp = New-Object System.Drawing.Bitmap(280, 230)
$g = [System.Drawing.Graphics]::FromImage($cropBmp)
$srcRect = New-Object System.Drawing.Rectangle(740, 95, 275, 225)
$dstRect = New-Object System.Drawing.Rectangle(0, 0, 275, 225)
$g.DrawImage($img, $dstRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
$cropBmp.Save("D:\jsr\scratch\rickshaw-test.png", [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose()
$cropBmp.Dispose()
$img.Dispose()
Write-Output "Rickshaw cropped."

