// src/utils/nvidiaApi.ts
// NOTE: The API key is hard‑coded per user request. In production move it to an .env file.

// src/utils/nvidiaApi.ts
// NOTE: The API key is loaded from an environment variable for security.
// Ensure you add VITE_NVIDIA_API_KEY to your .env file (or .env.local).

export async function callNvidiaAI(userMessage: string): Promise<string> {
  const invokeUrl = "https://integrate.api.nvidia.com/v1/chat/completions";
  const stream = false; // set true if you want streaming response

  const headers: Record<string, string> = {
    "Authorization": `Bearer ${import.meta.env.VITE_NVIDIA_API_KEY}`,
    "Content-Type": "application/json",
    "Accept": stream ? "text/event-stream" : "application/json",
  };

  const payload = {
    model: "google/gemma-3-27b-it",
    messages: [{ role: "user", content: userMessage }],
    max_tokens: 512,
    temperature: 0.2,
    top_p: 0.7,
    stream,
  };

  const response = await fetch(invokeUrl, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`NVIDIA API error ${response.status}: ${err}`);
  }

  if (stream) {
    // For simplicity we return the raw streamed text concatenated.
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let result = "";
    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        result += decoder.decode(value);
      }
    }
    return result;
  } else {
    const data = await response.json();
    // The API returns choices[0].message.content
    return data?.choices?.[0]?.message?.content ?? "";
  }
}
