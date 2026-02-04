// Simple key-value storage API for Vercel
const storage = {};

export default async function handler(req, res) {
  // Enable CORS - MUST be first!
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    let key, data;

    // Parse body for POST
    if (req.method === 'POST') {
      key = req.body?.key;
      data = req.body?.data;
    } else {
      // Parse query for GET
      key = req.query?.key;
    }

    if (!key) {
      return res.status(400).json({ error: 'Key is required' });
    }

    if (req.method === 'GET') {
      // Load data
      const value = storage[key];
      
      if (!value) {
        return res.status(404).json({ error: 'No data found for this key' });
      }

      return res.status(200).json({ key, data: value });
    }

    if (req.method === 'POST') {
      // Save data
      if (!data) {
        return res.status(400).json({ error: 'Data is required' });
      }

      storage[key] = data;

      return res.status(200).json({ 
        success: true, 
        key, 
        message: 'Data saved successfully' 
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}
