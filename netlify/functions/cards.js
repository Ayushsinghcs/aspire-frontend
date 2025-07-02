const { initialCards } = require('./data/initialCards.cjs')

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  }

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    }
  }

  try {
    if (event.httpMethod === 'GET') {
      // Return all cards
      return {
        statusCode: 200,
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(initialCards),
      }
    }

    if (event.httpMethod === 'POST') {
      // Create a new card
      const newCardData = JSON.parse(event.body)
      
      // Generate a new card with mock data
      const newCard = {
        id: Date.now(),
        name: newCardData.name,
        number: '5555 4444 3333 2222',
        expiry: '09/28',
        cvv: 789,
        balance: 5420,
        bgColor: '#FF6B6B',
        status: 'active',
        transactions: [],
      }

      return {
        statusCode: 201,
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCard),
      }
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    }
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' }),
    }
  }
} 