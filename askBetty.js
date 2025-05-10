const { Configuration, OpenAIApi } = require("openai");

exports.handler = async function (event, context) {
  const body = JSON.parse(event.body);
  const userMessage = body.message;

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY, // Add this in Netlify settings later
  });

  const openai = new OpenAIApi(configuration);

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userMessage }],
    });

    const reply = completion.data.choices[0].message.content;

    return {
      statusCode: 200,
      body: JSON.stringify({ reply }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to connect to OpenAI." }),
    };
  }
};