using System;
using System.IO;
using System.Net;
using System.Threading;
using System.Text;

public class StaticServer {
    private HttpListener listener;
    private string rootDir;
    private bool isRunning;

    public StaticServer(string rootDirectory, int port) {
        rootDir = Path.GetFullPath(rootDirectory);
        listener = new HttpListener();
        listener.Prefixes.Add("http://localhost:" + port + "/");
        listener.Prefixes.Add("http://127.0.0.1:" + port + "/");
    }

    public void Start() {
        listener.Start();
        isRunning = true;
        ThreadPool.QueueUserWorkItem(Listen);
    }

    public void Stop() {
        isRunning = false;
        try { listener.Stop(); } catch {}
        try { listener.Close(); } catch {}
    }

    private void Listen(object state) {
        while (isRunning && listener.IsListening) {
            try {
                var context = listener.GetContext();
                ThreadPool.QueueUserWorkItem(ProcessRequest, context);
            } catch {
                if (!isRunning) break;
            }
        }
    }

    private void ProcessRequest(object state) {
        var context = (HttpListenerContext)state;
        var request = context.Request;
        var response = context.Response;

        try {
            string rawUrl = request.Url.AbsolutePath;
            if (rawUrl == "/" || string.IsNullOrEmpty(rawUrl)) rawUrl = "/index.html";
            
            string relativePath = rawUrl.TrimStart('/').Replace('/', Path.DirectorySeparatorChar);
            string filePath = Path.Combine(rootDir, relativePath);

            // Resilient fallback resolution for animation frames
            if (!File.Exists(filePath)) {
                string fileName = Path.GetFileName(filePath);
                string candidateInFrames = Path.Combine(rootDir, "frames", fileName);
                string candidateInParentEzgif = Path.Combine(Directory.GetParent(rootDir).FullName, "ezgif-48940b26147f621c-jpg", fileName);

                if (File.Exists(candidateInFrames)) filePath = candidateInFrames;
                else if (File.Exists(candidateInParentEzgif)) filePath = candidateInParentEzgif;
            }

            if (File.Exists(filePath)) {
                string ext = Path.GetExtension(filePath).ToLowerInvariant();
                string mime = "application/octet-stream";
                switch (ext) {
                    case ".html": mime = "text/html; charset=utf-8"; break;
                    case ".css": mime = "text/css; charset=utf-8"; break;
                    case ".js": mime = "application/javascript; charset=utf-8"; break;
                    case ".json": mime = "application/json"; break;
                    case ".jpg":
                    case ".jpeg": mime = "image/jpeg"; break;
                    case ".png": mime = "image/png"; break;
                    case ".webp": mime = "image/webp"; break;
                    case ".svg": mime = "image/svg+xml"; break;
                    case ".ico": mime = "image/x-icon"; break;
                    case ".woff2": mime = "font/woff2"; break;
                }

                response.ContentType = mime;
                response.Headers["Access-Control-Allow-Origin"] = "*";
                
                // Caching strategy: immutable cache for image frames, revalidate for html/css/js
                if (ext == ".jpg" || ext == ".jpeg" || ext == ".png" || ext == ".webp") {
                    response.Headers["Cache-Control"] = "public, max-age=31536000, immutable";
                } else if (ext == ".css" || ext == ".js") {
                    response.Headers["Cache-Control"] = "public, max-age=1800";
                } else {
                    response.Headers["Cache-Control"] = "no-cache, must-revalidate";
                }
                
                var fileInfo = new FileInfo(filePath);
                response.ContentLength64 = fileInfo.Length;
                response.StatusCode = 200;

                if (!string.Equals(request.HttpMethod, "HEAD", StringComparison.OrdinalIgnoreCase)) {
                    using (var fs = new FileStream(filePath, FileMode.Open, FileAccess.Read, FileShare.ReadWrite)) {
                        byte[] buffer = new byte[65536];
                        int bytesRead;
                        while ((bytesRead = fs.Read(buffer, 0, buffer.Length)) > 0) {
                            response.OutputStream.Write(buffer, 0, bytesRead);
                        }
                    }
                }
            } else {
                response.StatusCode = 404;
                byte[] notFound = Encoding.UTF8.GetBytes("File Not Found: " + relativePath);
                response.ContentType = "text/plain";
                response.OutputStream.Write(notFound, 0, notFound.Length);
            }
        } catch {
            // Client closed connection prematurely
        } finally {
            try {
                response.Close();
            } catch {}
        }
    }
}
