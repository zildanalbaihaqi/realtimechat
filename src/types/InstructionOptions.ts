export type AgentStyle = "coach" | "critic" | "friend" | "mentor";

export type UserMood = "neutral" | "confident" | "nervous" | "tired" | "frustrated";

export interface InstructionOptions {
  shortReplies?: boolean;
  mood?: UserMood;
  interactionStage?: string;
  feedbackData?: { summary?: string };
  style?: AgentStyle;
}