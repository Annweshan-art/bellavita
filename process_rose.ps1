Add-Type -AssemblyName System.Drawing

$srcPath = Join-Path $PSScriptRoot "assets\bellavita-rose-woman.png"
$dstPath = Join-Path $PSScriptRoot "assets\bellavita-rose-woman-cutout.png"

$src = [System.Drawing.Bitmap]::FromFile($srcPath)
$w = $src.Width
$h = $src.Height

# Create output bitmap with 32-bit ARGB
$dst = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

# Find bounding box and remove white background
# Note: The red "50% off" badge is at the top-left (x < w * 0.25, y < h * 0.25)
# We can isolate the bottle and give it clean transparent background
for ($y = 0; $y -lt $h; $y++) {
    for ($x = 0; $x -lt $w; $x++) {
        $pixel = $src.GetPixel($x, $y)
        $r = $pixel.R
        $g = $pixel.G
        $b = $pixel.B

        # If pixel is near pure white background (R > 245, G > 245, B > 245)
        # or if it's the 50% badge in the corner (we want just the clean luxury bottle)
        $isCornerBadge = ($x -lt $w * 0.28 -and $y -lt $h * 0.16)
        
        if ($isCornerBadge) {
            $dst.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
        } elseif ($r -gt 242 -and $g -gt 242 -and $b -gt 242) {
            # White background to transparent
            $dst.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
        } elseif ($r -gt 225 -and $g -gt 225 -and $b -gt 225) {
            # Feather edge
            $alpha = [int](255 * (1.0 - (($r + $g + $b) / 3.0 - 225) / 20.0))
            if ($alpha -lt 0) { $alpha = 0 }
            if ($alpha -gt 255) { $alpha = 255 }
            $dst.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, $r, $g, $b))
        } else {
            $dst.SetPixel($x, $y, $pixel)
        }
    }
}

$dst.Save($dstPath, [System.Drawing.Imaging.ImageFormat]::Png)
$dst.Dispose()
$src.Dispose()

Write-Host "Processed Bellavita Rose Woman cutout: $dstPath"
