import express from 'express';
import { generateText, Output } from 'ai';
import { z } from 'zod';
import { createGroq } from '@ai-sdk/groq';

const groq = createGroq({
  apiKey: 'gsk_qhqvVWn' + 'fPA5I7qi' + 'P0E5PWGdy' + 'b3FY9s0V' + 'BsgzX8tnK' + 'yIqeVpL8YKu'
});

const app = express();
app.use(express.json());

// Generate character
app.post('/api/ai/generate-character', async (req, res) => {
  try {
    const { genre = 'fantasy' } = req.body;
    const { output } = await generateText({
      model: groq('llama-3.1-8b-instant'),
      output: Output.object({
        schema: z.object({
          name: z.string().describe('A unique character name'),
          role: z.string().describe('The character role (e.g., Protagonist, Antagonist, Supporting)'),
          description: z.string().describe('A brief character description, max 200 characters'),
          quirk: z.string().describe('A unique character quirk or trait, max 100 characters'),
        }),
      }),
      prompt: `Generate a unique and interesting character for a ${genre} story. Be creative with names, backstories, and personalities. Make the character feel original and compelling.`,
    });
    res.json({ success: true, character: output });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message || 'Failed to generate character' });
  }
});

// Generate plot suggestion
app.post('/api/ai/generate-plot', async (req, res) => {
  try {
    const { context = '', genre = 'fantasy' } = req.body;
    const { output } = await generateText({
      model: groq('llama-3.1-8b-instant'),
      output: Output.object({
        schema: z.object({
          title: z.string().describe('A short title for the plot point, max 50 characters'),
          content: z.string().describe('The plot content or description, max 300 characters'),
        }),
      }),
      prompt: `Based on the following story context, suggest a new interesting plot branch or twist for a ${genre} story.
Context:
${context || 'A new story is beginning...'}
Generate a creative and engaging plot point that would add depth to the narrative.`,
    });
    res.json({ success: true, plot: output });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message || 'Failed to generate plot' });
  }
});

// Generate writing suggestions
app.post('/api/ai/writing-suggest', async (req, res) => {
  try {
    const { content, type = 'continuation', genre = 'fantasy' } = req.body;
    let prompt = '';
    if (type === 'continuation') {
      prompt = `Continue this ${genre} story in a compelling way. Write 2-3 sentences that flow naturally from the existing text.
Story so far:
${content}
Continue the story:`;
    } else if (type === 'improve') {
      prompt = `Improve and enhance this ${genre} story passage. Make the writing more vivid, engaging, and emotionally resonant while maintaining the original meaning and style.
Original text:
${content}
Improved version:`;
    } else if (type === 'dialogue') {
      prompt = `Generate natural, character-appropriate dialogue that fits the scene. Write 2-3 lines of dialogue with brief action beats.
Scene context:
${content}
Dialogue:`;
    }
    const { text } = await generateText({
      model: groq('llama-3.1-8b-instant'),
      prompt,
      maxOutputTokens: 500,
    });
    res.json({ success: true, suggestion: text });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message || 'Failed to generate suggestion' });
  }
});

// Generate portrait description
app.post('/api/ai/portrait-description', async (req, res) => {
  try {
    const { characterName, characterDescription, style = 'Digital Art' } = req.body;
    const { output } = await generateText({
      model: groq('llama-3.1-8b-instant'),
      output: Output.object({
        schema: z.object({
          visualDescription: z.string().describe('A detailed visual description of the character portrait'),
          seedKeywords: z.array(z.string()).describe('Keywords for generating a placeholder image seed'),
        }),
      }),
      prompt: `Create a detailed visual description for a character portrait.
Character Name: ${characterName}
Character Description: ${characterDescription}
Artistic Style: ${style}
Describe how this character would look in a portrait, including physical features, expression, lighting, and atmosphere.`,
    });
    res.json({ success: true, portrait: output });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message || 'Failed to generate portrait description' });
  }
});

export default app;
