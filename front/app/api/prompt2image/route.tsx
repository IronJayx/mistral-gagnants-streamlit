import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

export const POST = async (req) => {
  try {
    console.log("Received POST request");

    const { prompt } = await req.json();
    console.log("Parsed JSON body");

    if (!prompt) {
      console.error("Prompt is missing in the request body");
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    let key = process.env.NEXT_OPENAI_API_KEY;
    console.log("Fetched API key from environment");

    if (!key) {
      console.error("API key is undefined in environment variables");
      return NextResponse.json({ error: 'Env key undefined' }, { status: 501 });
    }

    console.log("Instantiating OpenAI client");
    const client = new OpenAI({
      apiKey: key, 
    });

    console.log("Sending request to OpenAI API with prompt:", prompt);
    const response = await client.images.generate({
      model: 'dall-e-3',
      prompt: prompt,
      size: '1024x1024',
      quality: 'standard',
      n: 1,
    });

    console.log("Received response from OpenAI API");
    console.log(response);

    const imageUrl = response.data[0].url;
    const revised_prompt = response.data[0].revised_prompt;

    console.log("Generated image URL:", imageUrl);

    return NextResponse.json({ url: imageUrl, revised_prompt: revised_prompt }, { status: 200 });
  } catch (error) {
    console.error("Error during image generation:", error);
    return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 });
  }
};

export const GET = () => NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
