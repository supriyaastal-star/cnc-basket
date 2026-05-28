import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json(
        { message: "RAZORPAY_KEY_ID not configured" },
        { status: 400 }
      );
    }

    // Read the request body
    const body = await req.json();
    const amount = body.amount;
    if (!amount) {
      return NextResponse.json(
        { message: "Amount is required" },
        { status: 400 }
      );
    }

    // Dynamically import Razorpay
    const Razorpay = (await import("razorpay")).default;

    const rzp = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const order = await rzp.orders.create({
      amount, // now dynamic
      currency: "INR",
      receipt: `receipt#${Date.now()}`,
    });

    return NextResponse.json(order);
  } catch (err: any) {
    console.error("Error creating order:", err);
    return NextResponse.json(
      { message: "Failed to create order", error: err.message },
      { status: 500 }
    );
  }
}
