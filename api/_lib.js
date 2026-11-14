const crypto = require('crypto');
const SB = process.env.SUPABASE_URL, SK = process.env.SUPABASE_SERVICE_ROLE_KEY, PS = process.env.PAYSTACK_SECRET_KEY;
const H = { apikey: SK, 'Content-Type': 'application/json' };
if (SK && !SK.startsWith('sb_')) H.Authorization = 'Bearer ' + SK; // legacy JWT keys need it; new sb_secret_ keys must not send it

// THE PRICE LIST (the server is the authority; the browser only sends a plan id).
// price is in naira. If you change a price here, change it in index.html (PC_SETTINGS > PREMIUM > PLANS) too.
const PLANS = {
  m1: { days: 30,  price: 700 },    // 1 month
  m6: { days: 182, price: 3000 },   // 6 months
  y1: { days: 365, price: 5000 }    // 1 year
};

// Ask Paystack directly whether this payment really succeeded (never trust the browser).
async function paystackVerify(ref) {
  const r = await fetch('https://api.paystack.co/transaction/verify/' + encodeURIComponent(ref), { headers: { Authorization: 'Bearer ' + PS } });
  const j = await r.json();
  const d = j && j.data;
  if (!r.ok || !d || d.status !== 'success' || d.currency !== 'NGN') return null;
  const plan = PLANS[d.metadata && d.metadata.plan];
  if (!plan || d.amount < plan.price * 100) return null;   // unknown plan, or paid less than the plan costs
  d.plan = plan;
  return d;
}
async function getUntil(uid) {
  const r = await fetch(`${SB}/rest/v1/profiles?id=eq.${uid}&select=premium_until`, { headers: H });
  const j = await r.json();
  return (j[0] && j[0].premium_until) || null;
}
// Adds the plan's days on top of whatever access is left. Each Paystack reference counts only once.
async function grant(uid, ref, amount, days) {
  const ins = await fetch(`${SB}/rest/v1/payments`, { method: 'POST', headers: { ...H, Prefer: 'return=minimal' }, body: JSON.stringify({ reference: ref, user_id: uid, amount }) });
  if (ins.status === 409) return { premium_until: await getUntil(uid), duplicate: true };
  if (!ins.ok) throw new Error('payment insert failed ' + ins.status);
  const cur = await getUntil(uid);
  const base = Math.max(cur ? new Date(cur).getTime() : 0, Date.now());
  const until = new Date(base + days * 864e5).toISOString();
  const up = await fetch(`${SB}/rest/v1/profiles?on_conflict=id`, { method: 'POST', headers: { ...H, Prefer: 'resolution=merge-duplicates,return=minimal' }, body: JSON.stringify({ id: uid, premium_until: until }) });
  if (!up.ok) {
    await fetch(`${SB}/rest/v1/payments?reference=eq.${encodeURIComponent(ref)}`, { method: 'DELETE', headers: H });
    throw new Error('profile update failed ' + up.status);
  }
  return { premium_until: until };
}
module.exports = { SB, SK, PS, PLANS, crypto, paystackVerify, grant };
