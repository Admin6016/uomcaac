addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>uomcaac</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{min-height:100vh;display:flex;align-items:center;justify-content:center;
background:linear-gradient(135deg,#0f0c29,#302b63,#24243e);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;color:#fff}
.card{text-align:center;padding:48px 40px;background:rgba(255,255,255,0.06);
backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.12);border-radius:20px;
max-width:420px;width:90%}
h1{font-size:42px;font-weight:800;letter-spacing:.05em;margin-bottom:12px;
background:linear-gradient(135deg,#a78bfa,#60a5fa,#34d399);-webkit-background-clip:text;
-webkit-text-fill-color:transparent}
p{color:rgba(255,255,255,.7);font-size:16px;line-height:1.6}
.tag{display:inline-block;margin-top:20px;padding:6px 16px;border-radius:999px;
background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);
font-size:13px;color:rgba(255,255,255,.5)}
</style>
</head>
<body>
<div class="card">
  <h1>uomcaac</h1>
  <p>欢迎来到 uomcaac</p>
  <div class="tag">Powered by Cloudflare Workers</div>
</div>
</body>
</html>`;
  return new Response(html, {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
  });
}
