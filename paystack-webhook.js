// Backup path: activates Premium even if the student closes the tab right after paying.
// In Paystack Dashboard > Settings > API Keys & Webhooks, set the webhook URL to https://YOUR-DOMAIN/api/paystack-webhook
const L = require('./_lib');
const raw = req => new Promise((ok, no) => { let b = ''; req.on('data', c => b += c); req.on('end', () => ok(b)); req.on('error', no); });
module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();
  const body = await raw(req);
  const sig = L.crypto.createHmac('sha512', L.PS).update(body).digest('hex');
  if (sig !== req.headers['x-paystack-signature']) return res.status(401).end();
  try {
    const ev = JSON.parse(body);
    if (ev.event === 'charge.success') {
      const ref = ev.data.reference, d = await L.paystackVerify(ref);
      if (d && d.metadata && d.metadata.user_id) await L.grant(d.metadata.user_id, ref, d.amount);
    }
    res.status(200).end('ok');
  } catch (e) { res.status(500).end(); }
};
module.exports.config = { api: { bodyParser: false } };
