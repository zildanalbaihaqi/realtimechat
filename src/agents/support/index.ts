// src/agents/support/index.ts

import { AgentConfig } from "@/types/Agent";
import { UserProfile } from "@/types/User";
import { InstructionOptions } from "@/types/InstructionOptions";
import buildInstruction from "./instruction";
import { checkOrderTool, checkOrderLogic } from "./tools/checkOrder";

export const supportAgent: AgentConfig = {
  id: "support",
  name: "Support Agent",

  tools: [checkOrderTool],

  toolLogic: {
    checkOrder: checkOrderLogic
  },

  agentInstruction: (
    profile: UserProfile,
    options?: InstructionOptions
  ): string => {
    return buildInstruction(profile, options);
  }
};
