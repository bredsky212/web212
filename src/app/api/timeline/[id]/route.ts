import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { TimelineEvent } from "@/models/TimelineEvent";

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(_: Request, { params }: RouteParams) {
    try {
        await dbConnect();
        const { id } = await params;
        const event = await TimelineEvent.findById(id);
        if (!event) {
            return NextResponse.json({ error: "Event not found" }, { status: 404 });
        }
        return NextResponse.json(event);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch event" },
            { status: 500 }
        );
    }
}
