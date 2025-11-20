require('dotenv').config()
const axios = require('axios')

const apiKey = process.env.GEMINI_API_KEY
if (!apiKey) {
  console.error('GEMINI_API_KEY is missing')
  process.exit(1)
}

const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`

console.log('Fetching models...')

axios
  .get(url)
  .then((response) => {
    const data = response.data
    if (data.models) {
      console.log('Available Models:')
      data.models.forEach((model) => {
        if (
          model.supportedGenerationMethods &&
          model.supportedGenerationMethods.includes('generateContent')
        ) {
          console.log(`- ${model.name}`)
        }
      })
    } else {
      console.log('No models found.')
    }
  })
  .catch((error) => {
    console.error('Error:', error.message)
    if (error.response) {
      console.error('Response data:', error.response.data)
    }
  })
