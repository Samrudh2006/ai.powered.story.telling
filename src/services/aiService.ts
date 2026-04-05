// AI Service - Client-side API calls to server endpoints

export interface GeneratedCharacter {
  name: string;
  role: string;
  description: string;
  quirk: string;
}

export interface GeneratedPlot {
  title: string;
  content: string;
}

export interface PortraitDescription {
  visualDescription: string;
  seedKeywords: string[];
}

// Generate a new character using AI
export async function generateCharacter(genre: string = 'fantasy'): Promise<GeneratedCharacter> {
  const response = await fetch('/api/ai/generate-character', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ genre }),
  });
  
  const data = await response.json();
  
  if (!data.success) {
    throw new Error(data.error || 'Failed to generate character');
  }
  
  return data.character;
}

// Generate a plot suggestion using AI
export async function generatePlotSuggestion(context: string, genre: string = 'fantasy'): Promise<GeneratedPlot> {
  const response = await fetch('/api/ai/generate-plot', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ context, genre }),
  });
  
  const data = await response.json();
  
  if (!data.success) {
    throw new Error(data.error || 'Failed to generate plot');
  }
  
  return data.plot;
}

// Generate writing suggestions using AI
export async function generateWritingSuggestion(
  content: string, 
  type: 'continuation' | 'improve' | 'dialogue' = 'continuation',
  genre: string = 'fantasy'
): Promise<string> {
  const response = await fetch('/api/ai/writing-suggest', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, type, genre }),
  });
  
  const data = await response.json();
  
  if (!data.success) {
    throw new Error(data.error || 'Failed to generate suggestion');
  }
  
  return data.suggestion;
}

// Generate portrait description using AI
export async function generatePortraitDescription(
  characterName: string, 
  characterDescription: string, 
  style: string = 'Digital Art'
): Promise<PortraitDescription> {
  const response = await fetch('/api/ai/portrait-description', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ characterName, characterDescription, style }),
  });
  
  const data = await response.json();
  
  if (!data.success) {
    throw new Error(data.error || 'Failed to generate portrait description');
  }
  
  return data.portrait;
}

// Generate a unique portrait URL based on character traits
export function generatePortraitUrl(characterName: string, keywords: string[] = []): string {
  const seed = `${characterName}-${keywords.join('-')}`.replace(/\s+/g, '-').toLowerCase();
  return `https://picsum.photos/seed/${seed}/400/500`;
}
