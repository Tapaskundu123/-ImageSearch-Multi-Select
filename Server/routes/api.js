const express = require('express');
const axios = require('axios');
const Search = require('../models/Search');
const { ensureAuthenticated } = require('../middleware/auth');
const router = express.Router();

// GET /api/top-searches
router.get('/top-searches', ensureAuthenticated, async (req, res) => {
  try {
    const topSearches = await Search.aggregate([
      {
        $group: {
          _id: '$term',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    res.json({
      topSearches: topSearches.map(item => ({
        term: item._id,
        count: item.count
      }))
    });
  } catch (err) {
    console.error('Error fetching top searches:', err);
    res.status(500).json({ error: 'Failed to fetch top searches' });
  }
});

// POST /api/search
router.post('/search', ensureAuthenticated, async (req, res) => {
  try {
    const { term } = req.body;

    if (!term || term.trim() === '') {
      return res.status(400).json({ error: 'Search term is required' });
    }

    // Store search in database
    await Search.create({
      userId: req.user._id,
      term: term.trim()
    });

    // Fetch images from Unsplash
    const unsplashResponse = await axios.get(
      'https://api.unsplash.com/search/photos',
      {
        params: {
          query: term,
          per_page: 30,
          client_id: process.env.UNSPLASH_ACCESS_KEY
        }
      }
    );

    const images = unsplashResponse.data.results.map(img => ({
      id: img.id,
      url: img.urls.regular,
      thumb: img.urls.thumb,
      alt: img.alt_description || term,
      photographer: img.user.name,
      photographerUrl: img.user.links.html
    }));

    res.json({
      term,
      count: images.length,
      images
    });
  } catch (err) {
    console.error('Error performing search:', err);
    res.status(500).json({ error: 'Search failed' });
  }
});

// GET /api/history
router.get('/history', ensureAuthenticated, async (req, res) => {
  try {
    const history = await Search.find({ userId: req.user._id })
      .sort({ timestamp: -1 })
      .limit(20)
      .select('term timestamp');

    res.json({ history });
  } catch (err) {
    console.error('Error fetching history:', err);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

module.exports = router;