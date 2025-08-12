// types/Agent.ts

import { UserProfile } from "./User";
import { InstructionOptions } from "./InstructionOptions";

export interface AgentTool {
  type: "function";
  name: string;
  description: string;
  parameters: {
    type: "object";
    properties: Record<string, any>;
    required?: string[];
  };
}

export interface AgentConfig {
  id: string;
  name: string;

  tools: AgentTool[];

  /**
   * Maps a tool name to a handler function.
   */
  toolLogic: Record<string, (args: any) => any | Promise<any>>;

  /**
   * Dynamically build the agent's instruction/system prompt.
   */
  agentInstruction: (
    profile: UserProfile,
    options?: InstructionOptions
  ) => string;
}
