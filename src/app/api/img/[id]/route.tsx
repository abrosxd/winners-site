import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${params.id}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch image");
    }

    const buffer = await response.arrayBuffer();

    const headers = new Headers({
      "Content-Type": response.headers.get("content-type") || "image/jpeg",
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Length": buffer.byteLength.toString(),
    });

    return new Response(buffer, {
      headers,
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching image:", error);
    return new Response("Error fetching image", { status: 500 });
  }
}
