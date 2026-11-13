const crypto = require('crypto');
const SB = process.env.SUPABASE_URL, SK = process.env.SUPABASE_SERVICE_ROLE_KEY, PS = process.env.PAYSTACK_SECRET_KEY;
const PRICE_NGN = Number(process.env.PRICE_NGN || 2000);
const H = { apikey: SK, 'Content-Type': 'application/json' };
if (SK && !SK.startsWith('sb_')) H.Authorization = 'Bearer ' + SK; // legacy JWT keys need it; new sb_secret_ keys must not send it

// Ask Paystack directly whether this payment really succeeded (never trust the browser).
async function paystackVerify(ref) {
  const r = await fetch('https://api.paystack.co/transaction/verify/' + encodeURIComponent(ref), { headers: { Authorization: 'Bearer ' + PS } });
  const j = await r.json();
  const d = j && j.data;
  if (!r.ok || !d || d.status !== 'success') return null;
  if (d.currency !== 'NGN' || d.amount < PRICE_NGN * 100) return null;
  return d;
}
async function getUntil(uid) {
  const r = await fetch(`${SB}/rest/v1/profiles?id=eq.${uid}&select=premium_until`, { headers: H });
  const j = await r.json();
  return (j[0] && j[0].premium_until) || null;
}
// One-time payment = lifetime access. Each reference counts once.
const LIFETIME = '2099-12-31T00:00:00.000Z';
async function grant(uid, ref, amount) {
  const ins = await fetch(`${SB}/rest/v1/payments`, { method: 'POST', headers: { ...H, Prefer: 'return=minimal' }, body: JSON.stringify({ reference: ref, user_id: uid, amount }) });
  if (ins.status === 409) return { premium_until: await getUntil(uid), duplicate: true };
  if (!ins.ok) throw new Error('payment insert failed ' + ins.status);
  const up = await fetch(`${SB}/rest/v1/profiles?on_conflict=id`, { method: 'POST', headers: { ...H, Prefer: 'resolution=merge-duplicates,return=minimal' }, body: JSON.stringify({ id: uid, premium_until: LIFETIME }) });
  if (!up.ok) {
    await fetch(`${SB}/rest/v1/payments?reference=eq.${encodeURIComponent(ref)}`, { method: 'DELETE', headers: H });
    throw new Error('profile update failed ' + up.status);
  }
  return { premium_until: LIFETIME };
}
module.exports = { SB, SK, PS, crypto, paystackVerify, grant };
