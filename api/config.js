// Public values only (the anon key and Paystack PUBLIC key are meant to be visible to browsers).
module.exports = (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json({
    supabaseUrl: process.env.SUPABASE_URL || '',
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY || '',
    paystackKey: process.env.PAYSTACK_PUBLIC_KEY || ''
  });
};
