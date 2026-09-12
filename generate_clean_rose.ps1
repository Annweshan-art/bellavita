Add-Type -AssemblyName System.Drawing

$srcPath = Join-Path $PSScriptRoot "assets\bellavita-rose-woman.png"
$dstPath = Join-Path $PSScriptRoot "assets\bellavita-rose-woman-cutout.png"

$src = [System.Drawing.Bitmap]::FromFile($srcPath)
$w = $src.Width
$h = $src.Height

# We crop tightly around the bottle with slight margin:
# X from 255 to 475 (width = 220)
# Y from 0 to 785 (height = 785)
$cropX = 250
$cropY = 0
$cropW = 230
$cropH = 785

$dst = New-Object System.Drawing.Bitmap($cropW, $cropH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

for ($cy = 0; $cy -lt $cropH; $cy++) {
    $sy = $cropY + $cy
    if ($sy -ge $h) { continue }
    for ($cx = 0; $cx -lt $cropW; $cx++) {
        $sx = $cropX + $cx
        if ($sx -ge $w) { continue }

        $pixel = $src.GetPixel($sx, $sy)
        $r = $pixel.R
        $g = $pixel.G
        $b = $pixel.B

        # Check if pixel is background (near white/off-white)
        # Or if it's below the bottle bottom (shelf reflection / grey bar)
        $isBelowBottle = ($sy -ge 776)
        $isPureWhite = ($r -gt 248 -and $g -gt 248 -and $b -gt 248)
        
        # In the cap region ($sy < 235), the cap is gold (r > 150, g > 100, b < 210)
        # Outside the cap is white background
        $isCapRegion = ($sy -lt 235)
        if ($isCapRegion) {
            # Outside the cap edges
            if ($sx -lt 280 -or $sx -gt 442) {
                $dst.SetPixel($cx, $cy, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
                continue
            }
        } else {
            # Body region: outside pink bottle edges
            if ($sx -lt 263 -or $sx -gt 466) {
                $dst.SetPixel($cx, $cy, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
                continue
            }
        }

        if ($isBelowBottle) {
            # Fade out bottom contact shadow gently
            if ($sy -ge 780) {
                $dst.SetPixel($cx, $cy, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
            } else {
                $fade = [int](255 * (1.0 - ($sy - 776) / 4.0))
                $dst.SetPixel($cx, $cy, [System.Drawing.Color]::FromArgb($fade, $r, $g, $b))
            }
        } elseif ($isPureWhite) {
            $dst.SetPixel($cx, $cy, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
        } elseif ($r -gt 238 -and $g -gt 238 -and $b -gt 238) {
            # Soft feathered edge
            $alpha = [int](255 * (1.0 - (($r + $g + $b) / 3.0 - 238) / 10.0))
            if ($alpha -lt 0) { $alpha = 0 }
            if ($alpha -gt 255) { $alpha = 255 }
            $dst.SetPixel($cx, $cy, [System.Drawing.Color]::FromArgb($alpha, $r, $g, $b))
        } else {
            $dst.SetPixel($cx, $cy, $pixel)
        }
    }
}

$dst.Save($dstPath, [System.Drawing.Imaging.ImageFormat]::Png)
$dst.Dispose()
$src.Dispose()

Write-Host "Created clean cutout $dstPath ($cropW x $cropH)"
