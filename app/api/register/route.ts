import { registerSchema } from "@/app/schemas/registerSchema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      const errors = parsed.error.issues.map((issue) => issue.message).join(", ");
      return NextResponse.json({ message: errors }, { status: 400 });
    }

    const data = parsed.data;

    console.log("✅ New Registration:", data);

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
