import { NextRequest, NextResponse } from 'next/server';
import { contentDB } from '@/lib/storage';

export async function POST(request: NextRequest) {
  try {
    const { trendId } = await request.json();

    if (!trendId) {
      return NextResponse.json({ error: 'Trend ID is required' }, { status: 400 });
    }

    // In production, this would call OpenAI API and Replicate API
    // For demo purposes, we'll generate mock content

    const platforms = ['facebook', 'instagram', 'twitter', 'youtube', 'pinterest', 'threads'];
    const tones = ['professional', 'funny', 'informative'];
    const selectedTone = tones[Math.floor(Math.random() * tones.length)];

    // Simulate GPT-generated content
    const generatedText = await generateTextContent(trendId, selectedTone);

    // Simulate image generation
    const imageUrl = await generateImage(trendId);

    const newContent = {
      id: `content_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      trendId,
      trendTitle: 'AI Technology Breakthrough',
      text: generatedText,
      imageUrl,
      platforms: platforms.slice(0, 3 + Math.floor(Math.random() * 3)),
      tone: selectedTone,
      language: 'en',
      timestamp: new Date().toISOString()
    };

    contentDB.push(newContent);

    return NextResponse.json({ success: true, content: newContent });
  } catch (error) {
    console.error('Error generating content:', error);
    return NextResponse.json({ error: 'Failed to generate content' }, { status: 500 });
  }
}

async function generateTextContent(trendId: string, tone: string): Promise<string> {
  // In production, call OpenAI API:
  /*
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `You are a social media content creator. Create engaging posts with a ${tone} tone.`
      },
      {
        role: "user",
        content: `Create a social media post about: ${trendId}`
      }
    ],
    max_tokens: 150
  });
  return completion.choices[0].message.content;
  */

  // Mock generated content
  const samples = {
    professional: `🚀 Exciting developments in AI technology are reshaping our world! The latest breakthrough demonstrates unprecedented capabilities in machine learning and natural language processing. This innovation promises to revolutionize industries from healthcare to education. Stay tuned for more updates! #AI #Technology #Innovation`,
    funny: `🤖 Breaking: AI just learned to make coffee! ☕ Okay, not really... but it's getting pretty close! The latest tech breakthroughs are so mind-blowing, even robots are impressed. Who else is excited about the future? 🚀 #AI #TechHumor #FutureIsNow`,
    informative: `📊 Latest AI Breakthrough Analysis:\n\n✅ 40% improvement in processing speed\n✅ Enhanced accuracy in predictions\n✅ Reduced energy consumption\n✅ Better scalability for enterprises\n\nThis technology marks a significant milestone in artificial intelligence development. #AI #Technology #Innovation`
  };

  return samples[tone as keyof typeof samples] || samples.professional;
}

async function generateImage(trendId: string): Promise<string> {
  // In production, call Replicate API for Stable Diffusion:
  /*
  const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN });
  const output = await replicate.run(
    "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
    {
      input: {
        prompt: "AI technology breakthrough, futuristic, digital art",
        negative_prompt: "low quality, blurry"
      }
    }
  );
  return output[0];
  */

  // Mock image URLs
  const mockImages = [
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
    'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800',
    'https://images.unsplash.com/photo-1655635949384-f737c5133dfe?w=800',
  ];

  return mockImages[Math.floor(Math.random() * mockImages.length)];
}
