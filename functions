export async function onRequest(context) {
  const { request, env } = context;
  const KV = env.NID_KV; // Doit correspondre au nom de la variable de liaison
  const userId = "mon-nid-perso";

  if (request.method === "POST") {
    const data = await request.json();
    data.updatedAt = Date.now();
    await KV.put(userId, JSON.stringify(data));
    return new Response(JSON.stringify({ ok: true }), {
      headers: { "Content-Type": "application/json" }
    });
  }

  if (request.method === "GET") {
    const raw = await KV.get(userId);
    if (!raw) return new Response(JSON.stringify({ empty: true }), { status: 404 });
    return new Response(raw, { headers: { "Content-Type": "application/json" } });
  }
}
