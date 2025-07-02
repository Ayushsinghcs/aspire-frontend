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
    const cardId = parseInt(event.path.split('/').pop())
    
    if (event.httpMethod === 'GET') {
      // Find the specific card
      const card = initialCards.find(c => c.id === cardId)
      
      if (!card) {
        return {
          statusCode: 404,
          headers: {
            ...headers,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ error: 'Card not found' }),
        }
      }

      return {
        statusCode: 200,
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(card),
      }
    }

    if (event.httpMethod === 'PUT') {
      // Update the card
      const card = initialCards.find(c => c.id === cardId)
      
      if (!card) {
        return {
          statusCode: 404,
          headers: {
            ...headers,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ error: 'Card not found' }),
        }
      }

      const updateData = JSON.parse(event.body)
      const updatedCard = { ...card, ...updateData }

      return {
        statusCode: 200,
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCard),
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