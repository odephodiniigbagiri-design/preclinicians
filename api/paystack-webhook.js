// Paystack webhook: Paystack calls this URL by itself every time a payment succeeds.
// It activates Premium even if the student closed the tab or lost network right after paying.
// URL to give Paystack:  https://YOUR-DOMAIN/api/paystack-webhook
const L = require('./_lib');
const raw = req => new Promise((ok, no) => { let b = ''; req.on('data', c => b += c); req.on('end', () => ok(b)); req.on('error', no); });
module.exports = async (req, res) => {
  // Opening the URL in a browser is a quick way to check the deployment worked.
  if (req.method === 'GET') return res.status(200).end(L.PS ? 'Paystack webhook endpoint is live' : 'Endpoint is live, but PAYSTACK_SECRET_KEY is missing in Vercel');
  if (req.method !== 'POST') return res.status(405).end();
  if (!L.PS) return res.status(500).end();
  const body = await raw(req);
  // Only Paystack knows your secret key, so a valid signature proves the request is genuine.
  const sig = L.crypto.createHmac('sha512', L.PS).update(body).digest('hex');
  if (sig !== req.headers['x-paystack-signature']) return res.status(401).end();
  try {
    const ev = JSON.parse(body);
    if (ev.event === 'charge.success') {
      const ref = ev.data.reference, d = await L.paystackVerify(ref);   // double-check with Paystack
      if (d && d.metadata && d.metadata.user_id) await L.grant(d.metadata.user_id, ref, d.amount, d.plan.days);
    }
    res.status(200).end('ok');   // always answer 200 for events we handled or ignored
  } catch (e) { res.status(500).end(); }   // 500 makes Paystack retry later
};
module.exports.config = { api: { bodyParser: false } };
