document.addEventListener("DOMContentLoaded", () => {
  const chatForm = document.querySelector("form");
  const inputField = document.querySelector("input");
  const chatBox = document.querySelector(".chat-box");

  const OPENAI_API_KEY = "your-real-api-key"; // replace with ENV in production
  const API_URL = "https://api.openai.com/v1/chat/completions";

  async function sendMessage(message) {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    };

    const body = JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are Batty, an AI assistant for Ocean Auto Detailing. Help customers schedule, get quotes, or ask questions." },
        { role: "user", content: message }
      ]
    });

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: headers,
        body: body
      });

      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't understand.";
      return reply;
    } catch (error) {
      console.error("Error:", error);
      return "Sorry, something went wrong.";
    }
  }

  chatForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const message = inputField.value.trim();
    if (!message) return;

    chatBox.innerHTML += `<div><strong>You:</strong> ${message}</div>`;
    inputField.value = "";

    const response = await sendMessage(message);
    chatBox.innerHTML += `<div><strong>Batty:</strong> ${response}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
  });
});
