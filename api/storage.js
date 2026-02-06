// Persistent storage using JSONBin.io - No database setup needed!
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // JSONBin.io API config
  const JSONBIN_API_KEY = '$2a$10$Xe5KPmEGRJqE7.9IxqN3.uKGBJH0mKMcE3yC8cKlLj8GqQJSFO8Zy'; // Free public key
  const JSONBIN_BIN_ID = '676ebc4aad19ca34f8e560c8'; // Shared bin for all users with same FIXED_KEY

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
      // Load from JSONBin
      try {
        const response = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}/latest`, {
          headers: {
            'X-Master-Key': JSONBIN_API_KEY
          }
        });

        if (!response.ok) {
          return res.status(404).json({ error: 'No data found for this key' });
        }

        const result = await response.json();
        const allData = result.record || {};
        
        if (!allData[key]) {
          return res.status(404).json({ error: 'No data found for this key' });
        }

        return res.status(200).json({ key, data: allData[key] });
      } catch (error) {
        return res.status(404).json({ error: 'No data found for this key' });
      }
    }

    if (req.method === 'POST') {
      if (!data) {
        return res.status(400).json({ error: 'Data is required' });
      }

      // First, get existing data
      let allData = {};
      try {
        const getResponse = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}/latest`, {
          headers: {
            'X-Master-Key': JSONBIN_API_KEY
          }
        });
        if (getResponse.ok) {
          const result = await getResponse.json();
          allData = result.record || {};
        }
      } catch (e) {
        // First time, no data yet
      }

      // Add/update this key's data
      allData[key] = data;

      // Save back to JSONBin
      const updateResponse = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': JSONBIN_API_KEY
        },
        body: JSON.stringify(allData)
      });

      if (!updateResponse.ok) {
        throw new Error('Failed to save to JSONBin');
      }

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
