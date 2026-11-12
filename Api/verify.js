const L = require('./_lib');
module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });
  try {
    const token = (req.headers.authorization || '').replace(/^Bearer /, '');
    const u = await fetch(L.SB + '/auth/v1/user', { headers: { apikey: L.SK, Authorization: 'Bearer ' + token } });
    if (!u.ok) return res.status(401).json({ error: 'Not signed in' });
    const user = await u.json();
    const ref = req.body && req.body.reference;
    if (!ref) return res.status(400).json({ error: 'Missing reference' });
    const d = await L.paystackVerify(ref);
    if (!d) return res.status(402).json({ error: 'Payment not confirmed' });
    if (!d.metadata || d.metadata.user_id !== user.id) return res.status(403).json({ error: 'Payment belongs to another account' });
    res.status(200).json(await L.grant(user.id, ref, d.amount));
  } catch (e) { res.status(500).json({ error: 'Server error' }); }
};
