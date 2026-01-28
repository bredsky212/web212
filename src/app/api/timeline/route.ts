import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { TimelineEvent } from "@/models/TimelineEvent";

export async function GET() {
    try {
        await dbConnect();
        const events = await TimelineEvent.find().sort({ order: 1 });
        return NextResponse.json(events);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch timeline events" },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const body = await request.json();

        const maxOrder = await TimelineEvent.findOne().sort({ order: -1 });
        body.order = maxOrder ? maxOrder.order + 1 : 0;

        const event = await TimelineEvent.create(body);
        return NextResponse.json(event, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to create timeline event" },
            { status: 500 }
        );
    }
}
