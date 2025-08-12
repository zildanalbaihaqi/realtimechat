import { AgentTool } from "@/types/Agent";

export const checkOrderTool: AgentTool = {
  type: "function",
  name: "checkOrder",
  description: "Check the status of a customer's order.",
  parameters: {
    type: "object",
    properties: {
      orderId: {
        type: "string",
        description: "The ID of the order to look up"
      }
    },
    required: ["orderId"]
  }
};



export async function checkOrderLogic(args: { orderId: string }) {
  // mock logic, replace with real data lookup
  return {
    orderId: args.orderId,
    status: "Shipped",
    estimatedDelivery: "2025-06-20"
  };
}
