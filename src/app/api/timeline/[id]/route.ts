import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { TimelineEvent } from "@/models/TimelineEvent";

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, { params }: RouteParams) {
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

export async function PUT(request: NextRequest, { params }: RouteParams) {
    try {
        await dbConnect();
        const { id } = await params;
        const body = await request.json();
        const event = await TimelineEvent.findByIdAndUpdate(id, body, {
            new: true,
        });
        if (!event) {
            return NextResponse.json({ error: "Event not found" }, { status: 404 });
        }
        return NextResponse.json(event);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to update event" },
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
    try {
        await dbConnect();
        const { id } = await params;
        const event = await TimelineEvent.findByIdAndDelete(id);
        if (!event) {
            return NextResponse.json({ error: "Event not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Event deleted successfully" });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to delete event" },
            { status: 500 }
        );
    }
}
