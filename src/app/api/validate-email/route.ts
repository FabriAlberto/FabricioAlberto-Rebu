import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email es requerido" },
        { status: 400 }
      );
    }

    await new Promise(resolve => setTimeout(resolve, 500));

    // Simular validación: algunos emails ya existen
    const existingEmails = [
      "existing@empresa.com",
    ];

    const isValid = !existingEmails.includes(email.toLowerCase());
    
    return NextResponse.json(
      { 
        isValid,
        message: isValid ? "Email disponible" : "Este email ya está registrado"
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error validating email:', error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
