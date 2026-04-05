
export interface MockSuggestion {
  keywords: string[];
  title: string;
  content: string;
  type: 'plot' | 'character' | 'description' | 'dialogue';
}

const BASE_SUGGESTIONS: MockSuggestion[] = [
  // Plot Twists
  {
    keywords: ['betrayal', 'friend', 'secret', 'trust'],
    title: 'The Trusted Shadow',
    content: 'The person you trusted most has been reporting your every move to the High Council. They aren\'t doing it for money, but to protect a secret that could destroy the kingdom.',
    type: 'plot'
  },
  {
    keywords: ['magic', 'ancient', 'relic', 'artifact', 'power'],
    title: 'The Dormant Spark',
    content: 'The old relic isn\'t a weapon; it\'s a key. When activated, it doesn\'t destroy the enemy, but reveals a hidden path beneath the city that has been forgotten for a thousand years.',
    type: 'plot'
  },
  {
    keywords: ['war', 'battle', 'peace', 'conflict', 'army'],
    title: 'The Silent Truce',
    content: 'In the heat of the battle, both sides suddenly lose their ability to use magic. A third party has intervened, forcing a parley in the middle of the bloodiest conflict.',
    type: 'plot'
  },
  {
    keywords: ['mystery', 'identity', 'mask', 'unknown', 'who'],
    title: 'The Mirror Image',
    content: 'The antagonist is revealed to be a version of the protagonist from a parallel timeline where one critical choice went differently.',
    type: 'plot'
  },
  {
    keywords: ['forest', 'nature', 'spirit', 'woods', 'trees'],
    title: 'The Living Woods',
    content: 'The forest isn\'t just a place; it\'s a single sentient organism. Every tree is a neuron, and the protagonist has accidentally stepped into its "brain".',
    type: 'plot'
  },
  {
    keywords: ['time', 'future', 'past', 'clock', 'travel'],
    title: 'The Temporal Echo',
    content: 'The protagonist realizes they are stuck in a time loop, but each cycle, a small detail changes. They must find the source of the deviation to break free.',
    type: 'plot'
  },
  {
    keywords: ['dragon', 'beast', 'monster', 'creature'],
    title: 'The Last Guardian',
    content: 'The dragon isn\'t hoarding gold; it\'s guarding the last remaining seed of the World Tree, which is the only thing keeping the sun from burning out.',
    type: 'plot'
  },
  {
    keywords: ['king', 'queen', 'throne', 'empire', 'royal'],
    title: 'The Hollow Crown',
    content: 'The King has been dead for years, replaced by a sophisticated clockwork automaton controlled by a secret society of scholars.',
    type: 'plot'
  },
  // Character Ideas
  {
    keywords: ['warrior', 'knight', 'honor', 'sword', 'shield'],
    title: 'Sir Alistair the Broken',
    content: 'A knight who has sworn never to draw his sword again after a tragic mistake. He now fights only with a wooden staff and his wits.',
    type: 'character'
  },
  {
    keywords: ['thief', 'rogue', 'shadow', 'stealth', 'dagger'],
    title: 'Lyra the Whispering Wind',
    content: 'A thief who can literally turn into smoke for three seconds at a time. She uses this gift to escape the most secure vaults in the city.',
    type: 'character'
  },
  {
    keywords: ['mage', 'wizard', 'scholar', 'spell', 'book'],
    title: 'Master Elara',
    content: 'A blind mage who "sees" through the vibrations of magic in the air. Her spells are cast through intricate musical melodies.',
    type: 'character'
  },
  {
    keywords: ['assassin', 'dark', 'poison', 'silent'],
    title: 'Kaelen the Merciful',
    content: 'An assassin who only kills those who are already dying and in pain, acting as a grim reaper of sorts while being hunted by the law.',
    type: 'character'
  },
  {
    keywords: ['merchant', 'gold', 'trade', 'rich'],
    title: 'Barnaby the Gilded',
    content: 'A merchant who traded his soul for the ability to turn anything he touches into gold, but only for one hour. He lives in constant fear of his own touch.',
    type: 'character'
  },
  // Descriptions
  {
    keywords: ['city', 'steampunk', 'clockwork', 'gears', 'steam'],
    title: 'The Brass Metropolis',
    content: 'The city hummed with the rhythmic ticking of a million gears. Steam billowed from copper pipes, veiling the sun in a metallic haze.',
    type: 'description'
  },
  {
    keywords: ['ocean', 'sea', 'storm', 'waves', 'water'],
    title: 'The Churning Abyss',
    content: 'The waves rose like jagged mountains of glass, crashing down with the force of a falling sky. The salt spray stung like a thousand tiny needles.',
    type: 'description'
  },
  {
    keywords: ['mountain', 'snow', 'cold', 'ice', 'peak'],
    title: 'The Frozen Spire',
    content: 'The mountain peak pierced the clouds like a shard of obsidian. Eternal winds howled through the ice-crusted canyons, carrying the scent of ancient frost.',
    type: 'description'
  },
  {
    keywords: ['desert', 'sand', 'heat', 'sun', 'dune'],
    title: 'The Sea of Glass',
    content: 'The desert sands shifted like liquid gold under the relentless sun. In the distance, heat mirages danced, turning the horizon into a shimmering lake of fire.',
    type: 'description'
  }
];

// Function to generate a massive library of 200+ suggestions
const generateFullLibrary = (): MockSuggestion[] => {
  const library: MockSuggestion[] = [...BASE_SUGGESTIONS];
  
  const genres = ['Cyberpunk', 'High Fantasy', 'Noir Mystery', 'Space Opera', 'Gothic Horror', 'Steampunk', 'Post-Apocalyptic', 'Urban Fantasy', 'Historical Fiction', 'Psychological Thriller'];
  const themes = ['Redemption', 'Corruption', 'Discovery', 'Sacrifice', 'Ambition', 'Isolation', 'Unity', 'Revenge', 'Legacy', 'Survival'];
  const elements = ['Ancient Relic', 'Forbidden Knowledge', 'Lost City', 'Secret Society', 'Cursed Bloodline', 'Artificial Intelligence', 'Parallel World', 'Hidden Power', 'Unlikely Ally', 'Betrayal'];

  // Generate combinations to reach 200+
  genres.forEach(genre => {
    themes.forEach(theme => {
      elements.forEach(element => {
        // Only add if we need more or based on some logic to keep it diverse
        if (library.length < 250) {
          const type: 'plot' | 'character' | 'description' | 'dialogue' = 
            library.length % 4 === 0 ? 'plot' : 
            library.length % 4 === 1 ? 'character' : 
            library.length % 4 === 2 ? 'description' : 'dialogue';

          let content = '';
          let title = `${genre} ${theme}: ${element}`;
          
          if (type === 'plot') {
            content = `In a ${genre} world centered on ${theme.toLowerCase()}, the discovery of a ${element.toLowerCase()} changes everything. The protagonist must decide if the cost of using it is worth the potential ${theme.toLowerCase()} of their people.`;
          } else if (type === 'character') {
            content = `A ${genre} specialist known for their ${theme.toLowerCase()}. They carry a ${element.toLowerCase()} that grants them unique abilities but slowly drains their humanity.`;
          } else if (type === 'description') {
            content = `The ${genre} landscape was a testament to ${theme.toLowerCase()}. In the center stood the ${element.toLowerCase()}, a monument of power that dominated the horizon with its eerie glow.`;
          } else {
            content = `"You don't understand," they whispered, clutching the ${element.toLowerCase()}. "This ${theme.toLowerCase()} is all we have left in this ${genre} wasteland."`;
          }

          library.push({
            keywords: [genre.toLowerCase(), theme.toLowerCase(), element.toLowerCase()],
            title,
            content,
            type
          });
        }
      });
    });
  });

  return library;
};

export const MOCK_SUGGESTIONS = generateFullLibrary();

// Helper to get best mock response based on context
export const getMockAIResponse = (context: string, type: 'plot' | 'character' | 'description' | 'dialogue' = 'plot') => {
  const lowerContext = context.toLowerCase();
  
  // Filter by type first
  const typeMatches = MOCK_SUGGESTIONS.filter(s => s.type === type);
  
  // Find best keyword match
  let bestMatch = typeMatches[0];
  let maxMatches = -1;
  
  typeMatches.forEach(suggestion => {
    const matchCount = suggestion.keywords.filter(k => lowerContext.includes(k)).length;
    if (matchCount > maxMatches) {
      maxMatches = matchCount;
      bestMatch = suggestion;
    }
  });
  
  // If no good match, pick a random one of that type to keep it fresh
  if (maxMatches === 0) {
    return typeMatches[Math.floor(Math.random() * typeMatches.length)];
  }
  
  return bestMatch;
};
