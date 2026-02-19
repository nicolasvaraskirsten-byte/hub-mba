import { NextResponse } from "next/server";
import type { Locale } from "@/lib/i18n";

const COOKIE_NAME = "NEXT_LOCALE";
const MAX_AGE = 60 * 60 * 24 * 365; // 1 year

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const locale = (body?.locale === "en" ? "en" : "es") as Locale;
    const res = NextResponse.json({ ok: true, locale });
    res.cookies.set(COOKIE_NAME, locale, {
      path: "/",
      maxAge: MAX_AGE,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
    return res;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
