import WebSocket, { WebSocket as WS } from "ws";
import { OPENAI_URL } from "@/config/openai";
import { sendOpenAIMessage, updateOpenAISession } from "@/lib/openaiRelay";
import { parseOpenAIMessage } from "@/lib/messageParser";

export default function handleConnection(clientSocket: WS): void {
  console.log("[Client] Connected");

  const openaiSocket = new WebSocket(OPENAI_URL, {
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "OpenAI-Beta": "realtime=v1",
    },
  });

  openaiSocket.on("open", () => {
  console.log("[OpenAI] Connected");

  let sessionInitialized = false;

  clientSocket.on("message", (msg: WebSocket.RawData) => {
    try {
      console.log("[Client <- Server]", msg.toString());
      const data = JSON.parse(msg.toString());
      console.log("[Client -> Server]", data);
      console.log("[Client -> Server] Type:", data);
      if (data.type === "start_chat" && data.user && !sessionInitialized) {
        const { name, email } = data.user;

        // Set session only once
        sessionInitialized = true;

        // Create a personalized instruction
        const instructions = `
You are a helpful AI assistant in a customer support chat.
The user's name is ${name || "Guest"} and their email is ${email || "unknown@example.com"}.
Greet the user by name and assist them in a friendly, concise, and helpful manner.
If needed, you may reference their email for account-related questions.
        `.trim();

        // Send update to OpenAI session
        updateOpenAISession(openaiSocket, instructions);

        sendOpenAIMessage(openaiSocket, 'hi');


      } else if (typeof data.text === "string" && data.text.trim()) {
        // Handle follow-up messages
        sendOpenAIMessage(openaiSocket, data.text.trim());

      } else {
        console.warn("Unrecognized or invalid message format.");
      }

    } catch (err) {
      console.error("Failed to parse client message:", err);
    }
  });

  openaiSocket.on("message", (msg: WebSocket.RawData) => {
    const parsed = parseOpenAIMessage(msg.toString());
    if (parsed && clientSocket.readyState === WebSocket.OPEN) {
      clientSocket.send(JSON.stringify(parsed));
    }
  });
});


  const cleanup = () => {
    if (openaiSocket.readyState === WebSocket.OPEN) openaiSocket.close();
    if (clientSocket.readyState === WebSocket.OPEN) clientSocket.close();
    console.log("[Session] Closed");
  };

  clientSocket.on("close", cleanup);
  openaiSocket.on("close", cleanup);
}
