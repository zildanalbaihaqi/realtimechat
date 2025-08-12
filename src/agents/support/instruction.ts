// src/agents/support/instruction.ts
import { UserProfile } from "@/types/User";
import { InstructionOptions } from "@/types/InstructionOptions";
export default function buildInstructions(  profile: UserProfile,
  options?: InstructionOptions): string {
  return `You are a helpful customer support agent. Always be polite and helpful.
If the user asks about an order, try to check it using available tools.

User: ${profile.name}`
}
