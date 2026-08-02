import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}

test("renders the complete vehicle wallet landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Todo lo importante de tu vehículo/);
  assert.match(html, /Quiero acceso anticipado/);
  assert.match(html, /PROGRAMA DE USUARIOS FUNDADORES/);
  assert.match(html, /PRÓXIMAMENTE/);
  assert.match(html, /Política de privacidad/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Lorem ipsum|WhatsApp/);
});

test("renders legal information", async () => {
  for (const path of ["/terminos", "/privacidad", "/eliminacion-de-datos", "/aviso-legal"]) {
    const response = await render(path);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, /INFORMACIÓN LEGAL/);
    assert.match(html, /Volver al inicio/);
  }
});
