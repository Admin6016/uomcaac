export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    if (path === "/favicon.ico") return new Response("", { status: 204 });

    // 静态资源: /data/:id.jpg
    const imgMatch = path.match(/^\/data\/(\d+)\.jpg$/);
    if (imgMatch && env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    // 路由解析
    let certId = "1";
    const showMatch = path.match(/^\/uav-sczs-show\/(.+)$/);
    if (showMatch) {
      certId = showMatch[1].replace(/[^a-zA-Z0-9_-]/g, "") || "1";
    } else if (path.match(/^\/(\d+)$/)) {
      certId = path.match(/^\/(\d+)$/)[1];
    }

    const CERTS = {
      "1": { status: "已启用", title: "运营合格证", pages: 2 },
    };
    if (!CERTS[certId]) certId = "1";
    const cert = CERTS[certId];

    let pagesHtml = "";
    for (let i = 1; i <= cert.pages; i++) {
      pagesHtml += `<img class="cert-img" src="/data/${i}.jpg" />`;
    }

    const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title id="portal-title"></title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{height:100%}
body{font-family:"Microsoft YaHei","PingFang SC",sans-serif;background:#fff;color:#424242;overflow:hidden}
#app{width:100%;height:100%;overflow:hidden}
.register-page{display:flex;flex-direction:column;height:100vh;overflow:hidden}
.register-header{background:rgb(2,92,192);height:56px;min-height:56px;padding:0 16px;display:flex;align-items:center;flex-shrink:0}
.register-header img{height:42px;width:calc(100% - 32px);object-fit:contain;object-position:left center}
.register-container{flex:1;overflow-y:auto;overflow-x:hidden;padding:20px 0;display:flex;flex-direction:column;align-items:center}
.register-container h2{font-size:25px;font-weight:600;color:rgb(66,66,66);margin-bottom:15px;text-align:center;width:100%;padding:0 16px}
.p{height:45px;display:flex;align-items:center;justify-content:center;width:100%;padding:0 16px}
.status-icon{color:rgb(67,180,124);font-size:20px;margin-right:6px}
.register-box{background:#fff;width:100%;max-width:893px;margin:0 auto}
.cert-img{width:100%;height:auto;display:block}
.cert-img+.cert-img{margin-top:2px}
.register-footer{background:#fff;color:rgb(127,127,127);font-size:14px;padding:0 0 0 10px;height:30px;min-height:30px;display:flex;align-items:center;flex-shrink:0}
</style>
</head>
<body>
<div id="app">
  <div class="register-page">
    <div class="register-header">
      <img src="https://uom.caac.gov.cn/login/img/logo_indextop.9b55742d.png" alt="UOM"
        onerror="this.style.display='none'" />
    </div>
    <div class="register-container">
      <h2>${cert.title}</h2>
      <div class="p">
        <span><span class="status-icon">&#10003;</span> ${cert.status}</span>
      </div>
      <div class="register-box">${pagesHtml}</div>
    </div>
    <div class="register-footer">
      版权所有：中国民用航空局信息中心版权所有&copy;2021
    </div>
  </div>
</div>
</body>
</html>`;

    return new Response(html, {
      headers: { "Content-Type": "text/html;charset=UTF-8" },
    });
  }
};
