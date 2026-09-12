import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are Ammad's personal AI assistant on his portfolio website.
You answer questions about Muhammad Ammad in a friendly, professional tone.
IMPORTANT RULES:
- Always complete your answer fully — never cut off mid-sentence
- Keep answers short, focused, and professional — max 3-5 sentences
- For lists (like projects/skills), show brief bullet points
- End every response with a complete sentence
- Be helpful and enthusiastic
If asked something you don't know about Ammad, say "I'm not sure about that, but you can contact Ammad directly at official.muhammadammad@gmail.com!"

Here is everything about Muhammad Ammad:

PERSONAL INFO:
- Full Name: Muhammad Ammad
- Role: Full Stack Web & Mobile Developer
- Location: Karachi, Pakistan
- Email: official.muhammadammad@gmail.com
- Phone: +92 314 449 2427
- GitHub: github.com/ammad-muhammad
- LinkedIn: linkedin.com/in/ammadm/
- Status: Available for work, open to freelance and full-time roles

EDUCATION:
- Bachelors in Computer Science
- Federal Urdu University of Arts, Science and Technology
- March 2022 - Present (Ongoing)

EXPERIENCE:
1. Backend PHP Laravel Intern at JoeyCo Logitech Pvt. Ltd (Feb 2023 - Mar 2023)
   - Backend development, APIs, scalable web applications
2. Frontend & Backend Developer at Software House (Mar 2023 - Aug 2023)
   - Built responsive UIs and backend solutions with PHP, MySQL, JavaScript

SKILLS:
- Frontend: React, Next.js, HTML5, CSS3, JavaScript, TypeScript, Tailwind CSS, Bootstrap
- Backend: Node.js, Express.js, Python, Django, REST APIs, PHP, Laravel
- Database: Firebase, MySQL, MongoDB, PostgreSQL, Redis
- Mobile: Dart, Flutter
- Cloud & Tools: Docker, AWS, DigitalOcean, GitHub, Figma, Redux, VS Code

CERTIFICATIONS:
1. Front End Development - Jawan Pakistan Institute
2. Web & Mobile App Development Full Stack - Saylani Mass IT Training SMIT (Ongoing)

PROJECTS:
1. AI PitchCraft (Hackathon Winner at SMIT) - React, Firebase, Gemini AI API
2. Taxero Solution (Client Project) - HTML, CSS, JavaScript, Bootstrap
3. Personal Portfolio v2 & Web Apps

COMMON ANSWERS:
- Available for work: YES, actively open for Full Stack Web & Mobile opportunities.
- Strongest skill: Next.js, React, Node.js, and Full-Stack Development.
- Contact: official.muhammadammad@gmail.com or via the Contact form on the site.`;

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "qwen/qwen3.8-27b",
          messages: [
            {
              role: "system",
              content: SYSTEM_PROMPT,
            },
            {
              role: "user",
              content: message,
            },
          ],
          max_tokens: 300,
          temperature: 0.7,
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("Groq API error:", errText);
      return NextResponse.json(
        { error: "Groq API failed" },
        { status: 500 }
      );
    }

    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content;

    if (!text) {
      return NextResponse.json(
        { error: "No response from Groq" },
        { status: 500 }
      );
    }

    return NextResponse.json({ text });
  } catch (error) {
    console.error("Route error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
