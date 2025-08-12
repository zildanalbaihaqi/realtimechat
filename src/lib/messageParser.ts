export interface ParsedMessage {
  type: "text_delta" | "text_done" | "ping";
  id?: string;
  content?: string;
}

export function parseOpenAIMessage(rawMessage: string): ParsedMessage | undefined {
  try {
    const data = JSON.parse(rawMessage);

    switch (data.type) {
      case "response.text.delta":
        return {
          type: "text_delta",
          id: data.item_id,
          content: data.delta ?? undefined,
        };

      case "response.output_item.done":
        return {
          type: "text_done",
          id: data.item?.id,
          content: data.item?.content?.[0]?.text ?? undefined,
        };

      case "ping":
        return { type: "ping" };

      default:
        return;
    }
  } catch (err) {
    console.error("Error parsing OpenAI message:", err);
    return;
  }
}
