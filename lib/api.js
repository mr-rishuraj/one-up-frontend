export async function analyzeProfile(profileText) {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
  }

  const res = await fetch(`${API_BASE_URL}/api/analyze-profile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      profile_text: profileText,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to analyze profile: ${errorText}`);
  }

  return res.json();
}
