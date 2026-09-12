param([int]$port = 8080)

# Check if port is already listening; if so, try fallback 8081 or 8082
$tcpPortInUse = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
if ($tcpPortInUse) {
    Write-Host "Port $port is in use. Trying port 8081..."
    $port = 8081
}

$code = Get-Content -Path (Join-Path $PSScriptRoot "Server.cs") -Raw
Add-Type -TypeDefinition $code

$server = New-Object StaticServer($PSScriptRoot, $port)
$server.Start()
Write-Host "VERSACE Live 3D Website running at http://localhost:$port/"
Write-Host "Local network: http://127.0.0.1:$port/"

try {
    while ($true) {
        Start-Sleep -Seconds 1
    }
} finally {
    $server.Stop()
    Write-Host "Server stopped."
}
