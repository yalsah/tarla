const storage = {};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    let key, data;

    if (req.method === 'POST') {
      key = req.body?.key;
      data = req.body?.data;
    } else {
      key = req.query?.key;
    }

    if (!key) {
      return res.status(400).json({ error: 'Key is required' });
    }

    if (req.method === 'GET') {
      const value = storage[key];
      
      if (!value) {
        return res.status(404).json({ error: 'No data found for this key' });
      }

      return res.status(200).json({ key, data: value });
    }

    if (req.method === 'POST') {
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
