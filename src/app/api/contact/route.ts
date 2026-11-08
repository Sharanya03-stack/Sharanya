import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      fullName,
      email,
      company,
      projectType,
      budget,
      timeline,
      description,
      hp_field, // honeypot field for bot/spam defense
    } = body;

    // Spam check: honeypot field should always be empty
    if (hp_field) {
      return NextResponse.json(
        { success: true, message: "Inquiry received." },
        { status: 200 }
      );
    }

    // Input validation
    if (!fullName || typeof fullName !== "string" || fullName.trim().length < 2) {
      return NextResponse.json(
        { error: "Please enter your full name (minimum 2 characters)." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Please provide a valid business or personal email address." },
        { status: 400 }
      );
    }

    if (!description || typeof description !== "string" || description.trim().length < 10) {
      return NextResponse.json(
        { error: "Please provide a brief project overview (at least 10 characters)." },
        { status: 400 }
      );
    }

    const sanitizedData = {
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      company: company ? String(company).trim() : null,
      projectType: projectType || "General Web Application",
      budget: budget || "Not specified",
      timeline: timeline || "Flexible",
      description: description.trim(),
      submittedAt: new Date().toISOString(),
    };

    // Log received inquiry to server console
    console.log("[INQUIRY_RECEIVED]:", JSON.stringify(sanitizedData, null, 2));

    // If an external webhook is provided in .env (e.g. Discord, Slack, Zapier, Supabase, Make)
    const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: `📬 **New Client Inquiry from ${sanitizedData.fullName}**\n**Email:** ${sanitizedData.email}\n**Company:** ${sanitizedData.company || "N/A"}\n**Type:** ${sanitizedData.projectType}\n**Budget:** ${sanitizedData.budget}\n**Timeline:** ${sanitizedData.timeline}\n**Details:**\n${sanitizedData.description}`,
          }),
        });
      } catch (webhookErr) {
        console.error("Webhook forwarding error:", webhookErr);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thank you! Your inquiry has been delivered. I will review your requirements and respond within 24 hours.",
        data: {
          fullName: sanitizedData.fullName,
          email: sanitizedData.email,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while transmitting your inquiry. Please email me directly." },
      { status: 500 }
    );
  }
}
