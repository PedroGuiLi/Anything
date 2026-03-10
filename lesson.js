export default async function handler(req, res) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { topic, profileName, profileDesc, styleInstruction } = req.body;

  if (!topic || !profileName) {
    return res.status(400).json({ error: "Missing topic or profile" });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "ANTHROPIC_API_KEY not configured on server." });
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 1024,
        messages: [
          {
            role: "user",
            content: `You are a master teacher who personalizes lessons based on how each person learns best.

Teach the topic "${topic}" to a learner with this profile: "${profileName}" — ${profileDesc}

Teaching style instruction: ${styleInstruction}

Write a 200–250 word lesson perfectly tailored to this learner. Be direct and personal. Do NOT start with preamble like "Here's your lesson" or "Sure!". Begin teaching immediately. End with exactly one specific action or reflection the learner should do right now.`,
          },
        ],
      }),
    });

    const data = await response.json();

    if (data.error) {
      return res.status(400).json({ error: data.error.message });
    }

    const text = data.content
      ?.filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("") || "";

    return res.status(200).json({ lesson: text });
  } catch (err) {
    return res.status(500).json({ error: err.message || "Internal server error" });
  }
}
