/* OnePager: собирает лист 1920×1080 из c.op (см. data.js). Нужны data.js и op.css.
   QR рисуется библиотекой qrcode-generator, если она подключена. */
function opQR(text){
  if (typeof qrcode !== "function") return "";
  const q = qrcode(0, "M"); q.addData(text); q.make();
  return q.createSvgTag({ cellSize: 4, margin: 0, scalable: true });
}
function renderOnePager(c){
  const o = c.op, t = c.theme || {};
  const url = `${SITE_URL}/${pageUrl(c)}`;
  const style = Object.entries({lab:t.lab, acc:t.acc, box:t.box, glow:t.glow, line:t.line})
    .filter(([,v]) => v).map(([k,v]) => `--${k}:${v}`).join(";");
  const price = priceShown(c)
    ? `<div class="op-price"><span class="m">стоимость участия</span><b>${esc(c.price.value)} <i>₽</i></b></div>`
    : `<a class="op-price tbd" href="${url}"><span class="m">стоимость участия</span><b>по запросу</b><span class="op-qr">${opQR(url)}</span></a>`;
  const year = D(c.end).getUTCFullYear();
  return `
  <div class="op" style="${style}">
    <div class="abs op-head">
      <div class="op-top"><span class="m">коллаборация / ${esc(monthsLabel(c))} ${year}</span><a class="op-cta" href="${url}">Принять участие →</a></div>
      <h1 class="op-title">${esc(qt(c))}</h1>
      <p class="op-sub">${esc(cap(c.sub))}</p>
      <i class="op-vr"></i>
      <div class="op-meta"><div><span class="m">когда</span><b>${period(c)}</b></div><div><span class="m">формат</span><b>${esc(cap(c.format))}</b></div></div>
      ${price}
    </div>
    <div class="abs op-story">
      <div class="op-ph"><img src="${o.photo || c.img}" alt=""></div>
      <div class="op-ctx"><span class="m">контекст</span><p>${esc(o.context)}</p></div>
    </div>
    <div class="abs op-ip">
      <div class="op-col op-c1"><span class="m">идея</span><h4>${esc(o.idea.h)}</h4><p>${esc(o.idea.text)}</p></div>
      <i class="op-vr"></i>
      <div class="op-col op-c2"><span class="m">промо</span><h4>${esc(o.promo.h)}</h4><p>${esc(o.promo.text)}</p></div>
    </div>
    <div class="abs op-gets"><span class="m">что получает партнёр</span>
      <ul>${o.gets.slice(0,4).map((g,i) => `<li><span>0${i+1}</span>${esc(g)}</li>`).join("")}</ul>
    </div>
    <div class="abs op-steps" style="--n:${o.steps.length}">
      <div class="op-steps-h"><span class="m">как идёт проект</span><i></i><img src="img/wordmark_dark.png" alt="makelove"></div>
      <ol>${o.steps.map((s,i) => `<li><span>0${i+1}</span>${esc(s)}</li>`).join("")}</ol>
      <span class="op-foot">${esc(CONTACTS[0][1])} · ${esc(url.replace(/^https?:\/\//,""))}</span>
    </div>
  </div>`;
}
/* вписать лист в контейнер */
function fitOnePagers(){
  document.querySelectorAll(".op-fit").forEach(box => {
    const op = box.querySelector(".op"); if (op) op.style.transform = `scale(${box.clientWidth / 1920})`;
  });
}
addEventListener("resize", fitOnePagers);
