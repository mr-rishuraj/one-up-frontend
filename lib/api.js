export async function analyzeProfile(profileText) {
  const res = await fetch("http://127.0.0.1:8000/api/analyze-profile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      profile_text: profileText,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to analyze profile");
  }

  return res.json();
}
