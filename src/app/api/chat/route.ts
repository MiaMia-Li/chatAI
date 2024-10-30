import { convertToCoreMessages, Message, streamText } from "ai";
import { z } from "zod";

import {
  CoreMessage,
  CoreUserMessage,
  ImagePart,
  LanguageModel,
  TextPart,
} from "ai";
import { createOpenAI, openai } from "@ai-sdk/openai";
// import { auth } from "@/app/(auth)/auth";
// import { deleteChatById, getChatById, saveChat } from "@/db/queries";

export async function POST(request: Request) {
  const {
    id,
    messages,
    data,
  }: { id: string; messages: Array<CoreMessage>; data: any } =
    await request.json();

  //

  // const session = await auth();

  // if (!session) {
  //   return new Response("Unauthorized", { status: 401 });
  // }
  const resumeAnalysisSchema = z.object({
    score: z.number().min(0).max(100),
    scoreCategories: z.array(
      z.object({
        name: z.string(),
        score: z.number().min(0).max(100),
      })
    ),
    sections: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        suggestions: z.array(
          z.object({
            title: z.string(),
            description: z.string(),
            priority: z.enum(["high", "medium", "low"]),
          })
        ),
      })
    ),
    basicInfo: z.object({
      name: z.string(),
      email: z.string(),
      phone: z.string(),
      education: z.string(),
      summary: z.string().optional(),
    }),
    workExperience: z.array(
      z.object({
        company: z.string(),
        position: z.string(),
        period: z.string(),
        description: z.string(),
        achievements: z.array(z.string()).optional(),
      })
    ),
    skills: z.array(z.string()),
  });
  // const coreMessages = convertToCoreMessages(messages);
  // const updatedMessages = coreMessages.map((msg, index) =>
  //   index === 0 ? { ...msg, content: msg.content + data?.markdown || "" } : msg
  // );

  const result = await streamText({
    model: openai("gpt-4o-mini"),
    messages,
    system:
      "You are a professional resume analyst. Please analyze the resume content in detail and provide scores and improvement suggestions,Scoring from three aspects: Content Quality, Keyword Optimization, Structure & Format then give a summary and total score of the resume。Only need to use the tools provided analyzeResume when messages is markdown type.When use the tools, you need to ask for confirmation first.when receive yes, then use the tools to analyze the resume, when receive no, then stop.",
    maxSteps: 5,
    tools: {
      analyzeResume: {
        description:
          "Analyze the resume content and provide scores and suggestions",
        parameters: resumeAnalysisSchema,
        execute: async (resumeData) => {
          return resumeData;
        },
      },
      askForConfirmation: {
        description: "Ask the user for confirmation.",
        parameters: z.object({
          message: z.string().describe("The message to ask for confirmation."),
        }),
      },
    },
    // tools: {
    //   getWeather: {
    //     description: "Get the current weather at a location",
    //     parameters: z.object({
    //       latitude: z.number(),
    //       longitude: z.number(),
    //     }),
    //     execute: async ({ latitude, longitude }) => {
    //       const response = await fetch(
    //         `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&hourly=temperature_2m&daily=sunrise,sunset&timezone=auto`
    //       );

    //       const weatherData = await response.json();
    //       return weatherData;
    //     },
    //   },
    // },
    // onFinish: async ({ responseMessages }) => {
    //   if (session.user && session.user.id) {
    //     try {
    //       await saveChat({
    //         id,
    //         messages: [...coreMessages, ...responseMessages],
    //         userId: session.user.id,
    //       });
    //     } catch (error) {
    //       console.error("Failed to save chat");
    //     }
    //   }
    // },
    // experimental_telemetry: {
    //   isEnabled: true,
    //   functionId: "stream-text",
    // },
    // experimental_toolCallStreaming: true,
  });

  return result.toDataStreamResponse({});
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return new Response("Not Found", { status: 404 });
  }

  const session = await auth();

  if (!session || !session.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const chat = await getChatById({ id });

    if (chat.userId !== session.user.id) {
      return new Response("Unauthorized", { status: 401 });
    }

    await deleteChatById({ id });

    return new Response("Chat deleted", { status: 200 });
  } catch (error) {
    return new Response("An error occurred while processing your request", {
      status: 500,
    });
  }
}
