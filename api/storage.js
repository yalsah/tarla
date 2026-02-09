// Permanent storage using Supabase - Free and reliable!
import { createClient } from '@supabase/supabase-js';

// Get these from your Supabase project settings
const SUPABASE_URL = process.env.SUPABASE_URL || 'YOUR_SUPABASE_URL';
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default async function handler(req, res) {
  // Enable CORS
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
      // Load from Supabase - get the most recent one if multiple exist
      const { data: results, error } = await supabase
        .from('land_storage')
        .select('data')
        .eq('key', key)
        .order('updated_at', { ascending: false })
        .limit(1);

      if (error) {
        console.error('Supabase error:', error);
        return res.status(500).json({ error: 'Database error', details: error.message });
      }

      if (!results || results.length === 0) {
        return res.status(404).json({ error: 'No data found for this key' });
      }

      return res.status(200).json({ key, data: results[0].data });
    }

    if (req.method === 'POST') {
      if (!data) {
        return res.status(400).json({ error: 'Data is required' });
      }

      // Check if key already exists
      const { data: existing } = await supabase
        .from('land_storage')
        .select('id')
        .eq('key', key)
        .limit(1);

      if (existing && existing.length > 0) {
        // Update existing record
        const { error } = await supabase
          .from('land_storage')
          .update({ 
            data: data,
            updated_at: new Date().toISOString()
          })
          .eq('key', key);

        if (error) {
          console.error('Supabase update error:', error);
          throw new Error(error.message);
        }
      } else {
        // Insert new record
        const { error } = await supabase
          .from('land_storage')
          .insert({ 
            key: key, 
            data: data,
            updated_at: new Date().toISOString()
          });

        if (error) {
          console.error('Supabase insert error:', error);
          throw new Error(error.message);
        }
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
