Start-Process -NoNewWindow -FilePath node -ArgumentList "node_modules/@angular/cli/bin/ng.js","serve","--port","4200","--host","localhost"
Start-Sleep -Seconds 90
try {
    $r = Invoke-WebRequest -Uri "http://localhost:4200" -UseBasicParsing -TimeoutSec 10
    Write-Output "SERVER_UP:$($r.StatusCode)"
} catch {
    Write-Output "SERVER_DOWN"
}