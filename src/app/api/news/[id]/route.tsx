import { NextRequest, NextResponse } from "next/server";
import client from "@services/directus";
import { readItem } from "@directus/sdk";

const monthNames: Record<number, string> = {
  0: "января",
  1: "февраля",
  2: "марта",
  3: "апреля",
  4: "мая",
  5: "июня",
  6: "июля",
  7: "августа",
  8: "сентября",
  9: "октября",
  10: "ноября",
  11: "декабря",
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  return {
    day: String(date.getDate()).padStart(2, "0"),
    month: monthNames[date.getMonth()],
    year: date.getFullYear(),
    time: date.toTimeString().slice(0, 5),
  };
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const news = await client.request(
      readItem("news", params.id, {
        fields: [
          "id",
          "date_created",
          "date_updated",
          "status",
          "image",
          "title",
          "article",
        ],
      })
    );

    if (!news || news.status !== "published") {
      return NextResponse.json({ error: "News not found" }, { status: 404 });
    }

    const newsWithFormattedDate = {
      ...news,
      date_created: formatDate(news.date_created),
    };

    return NextResponse.json(newsWithFormattedDate);
  } catch (error) {
    console.error("Error fetching news item:", error);
    return NextResponse.json(
      { error: "Failed to fetch news item" },
      { status: 500 }
    );
  }
}
