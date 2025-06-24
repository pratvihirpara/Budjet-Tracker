import express from 'express'
import fetch from 'node-fetch'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

const GEMINI_API_KEY = 'AIzaSyBtjszzz9IH2EchbP7lzdvSTiVuajoAQeY'

app.post('/api/gemini', async (req, res) => {
  try {
    const { userMessage, systemPrompt } = req.body
    console.log('Received:', userMessage)
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            { role: 'user', parts: [{ text: systemPrompt }] },
            { role: 'user', parts: [{ text: userMessage }] }
          ]
        })
      }
    )
    const data = await response.json()
    console.log('Gemini API response:', data)
    res.json(data)
  } catch (e) {
    console.error('Proxy error:', e)
    res.status(500).json({ error: 'Proxy error', details: e.message })
  }
})

const PORT = 3001
app.listen(PORT, () => console.log(`Gemini proxy running on port ${PORT}`))