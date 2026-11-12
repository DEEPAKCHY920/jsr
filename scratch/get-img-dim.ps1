Add-Type -AssemblyName System.Drawing

$p = "C:\Users\techn\.gemini\antigravity\brain\b004bd44-88a2-4f25-ac96-38233a3ae9d5\.user_uploaded\media_1794487170354_bbc8b128.jpg"
$img = [System.Drawing.Image]::FromFile($p)
Write-Output "Dimensions: $($img.Width) x $($img.Height)"
$img.Dispose()
