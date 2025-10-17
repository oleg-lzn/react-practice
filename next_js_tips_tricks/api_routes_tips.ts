import { NextRequest, NextResponse } from "next/server";

export const GET = (req: NextRequest) => {
  return NextResponse.json({ data: { message: "Hello, World!" } });
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const data = await req.json();
  const id = await params;
  return NextResponse.json(data);
};

// чтобы получить параметры из маршрутов и использовать api рауты
// динамическим параметрам нужен 2 аргумент params в хэндлере
// app/api/issues/[id]/route.ts

// { params }: { params: { id: string } } - такая запись
// это деструктуризация аргумента, реально передается { params }, а справа типизация

// GET /api/issues/123
export async function GET(req, { params }: { params: { id: string } }) {
  const issue = await prisma.issue.findUnique({ where: { id: +params.id } });
  return NextResponse.json(issue);
}

// PUT /api/issues/123
export async function PUT(req, { params }: { params: { id: string } }) {
  const body = await req.json();
  const updated = await prisma.issue.update({
    where: { id: +params.id },
    data: body,
  });
  return NextResponse.json(updated);
}
