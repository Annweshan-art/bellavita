$urls = @(
    'http://localhost:8080/',
    'http://localhost:8080/style.css',
    'http://localhost:8080/script.js',
    'http://localhost:8080/assets/bellavita-rose-woman-cutout.png',
    'http://localhost:8080/assets/bellavita-rose-woman.png',
    'http://localhost:8080/frames/ezgif-frame-001.jpg',
    'http://localhost:8080/frames/ezgif-frame-300.jpg'
)

foreach ($u in $urls) {
    try {
        $res = Invoke-WebRequest -Uri $u -UseBasicParsing
        Write-Host "$($res.StatusCode) OK : $u ($($res.RawContentLength) bytes)"
    } catch {
        Write-Host "ERR on $u : $_"
    }
}
