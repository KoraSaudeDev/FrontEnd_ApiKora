import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const url = process.env.NEXT_PUBLIC_APP;
  try {
    const cookieStore = cookies();
    (await cookieStore).delete("user");

    return NextResponse.redirect(`${url}/login`);
  } catch (error) {
    console.error("Erro ao processar o logout:", error);

    return NextResponse.json(
      { error: "Erro ao fazer logout" },
      { status: 500 }
    );
  }
}
