interface SkillMetric {
  label: string;
  score: number;
  maxScore: number;
}

interface RoadmapResponse {
  skill: string;
  currentScore: number;
  targetScore: number;
  roadmap: string[];
}

const SARVAM_API_KEY = 'sk_8hgin48x_w9PrwJTFh0djKGRcPubfBAYn';

export const generateSkillRoadmap = async (
  skills: SkillMetric[],
  threshold: number = 60
): Promise<RoadmapResponse[]> => {
  // Filter skills below threshold
  const weakSkills = skills.filter(skill => {
    const percentage = (skill.score / skill.maxScore) * 100;
    return percentage < threshold;
  });

  if (weakSkills.length === 0) {
    return [];
  }

  // Prepare the prompt for Sarvam AI
  const skillsInfo = weakSkills.map(skill => {
    const percentage = Math.round((skill.score / skill.maxScore) * 100);
    return `${skill.label}: ${percentage}% (current score: ${skill.score}/${skill.maxScore})`;
  }).join('\n');

  const prompt = `You are an expert career counselor and technical mentor. A student has the following weak skills with their current scores:

${skillsInfo}

Please provide a structured roadmap for each weak skill to help the student improve. For each skill, provide:
1. Specific learning resources (courses, tutorials, books)
2. Practice exercises or projects
3. Step-by-step improvement plan
4. Timeframe for improvement
5. Key milestones to track progress

Format your response as a JSON array with this structure:
[
  {
    "skill": "Skill Name",
    "currentScore": current score,
    "targetScore": 80,
    "roadmap": [
      "Step 1: Learn fundamentals - specific resource",
      "Step 2: Practice exercise - specific task",
      "Step 3: Build project - specific project idea",
      "Step 4: Advanced topics - specific topics",
      "Step 5: Master level - specific achievement"
    ]
  }
]

Make the roadmap actionable, specific, and practical. Include concrete resources like course names, book titles, project ideas, and timeframes.`;

  try {
    // Use the correct Sarvam AI SDK approach
    const response = await fetch('https://api.sarvam.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-subscription-key': SARVAM_API_KEY,
      },
      body: JSON.stringify({
        model: 'sarvam-105b-conversations',
        messages: [
          {
            role: 'system',
            content: 'You are an expert career counselor and technical mentor. Always respond with valid JSON arrays.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.2,
        top_p: 1,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      throw new Error(`Sarvam AI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    // Parse the JSON response
    try {
      const roadmapData = JSON.parse(content);
      return roadmapData;
    } catch (parseError) {
      console.error('Failed to parse Sarvam AI response:', content);
      // Fallback: return a simple roadmap structure
      return weakSkills.map(skill => ({
        skill: skill.label,
        currentScore: skill.score,
        targetScore: 80,
        roadmap: [
          'Step 1: Start with online tutorials and documentation',
          'Step 2: Practice with small exercises and projects',
          'Step 3: Join coding communities and forums',
          'Step 4: Work on real-world projects',
          'Step 5: Take mock tests and get feedback'
        ]
      }));
    }
  } catch (error) {
    console.error('Error calling Sarvam AI:', error);
    // Fallback: return a simple roadmap structure
    return weakSkills.map(skill => ({
      skill: skill.label,
      currentScore: skill.score,
      targetScore: 80,
      roadmap: [
        'Step 1: Start with online tutorials and documentation',
        'Step 2: Practice with small exercises and projects',
        'Step 3: Join coding communities and forums',
        'Step 4: Work on real-world projects',
        'Step 5: Take mock tests and get feedback'
      ]
    }));
  }
};
