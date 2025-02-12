import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, phone, message } = await req.json();

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["san.gambashidze@gmail.com"],
      subject: `New Contact Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    return NextResponse.json({ success: "Message sent!", data });
  } catch (error) {
    console.error("Resend Error:", error);
    return NextResponse.json({ error: "Error sending email" }, { status: 500 });
  }
}
