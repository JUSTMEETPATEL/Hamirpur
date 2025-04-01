"use server";

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Session } from '@/lib/session';


export async function POST(req: Request) {
  try {
    // Get the current user's session
    const session = await Session();
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse the request body
    const { 
      imageBase64, 
      questions, 
      result,
      confidence
    } = await req.json();

    // Validate input
    if (!imageBase64 || !result) {
      return NextResponse.json({ 
        error: 'Missing required fields' 
      }, { status: 400 });
    }

    // Save classification to database
    const classification = await prisma.eWasteClassification.create({
      data: {
        userId: session.user.id,
        imageBase64,
        questions, // Store questions as a JSON array
        result,
        confidence: confidence ?? undefined 
      }
    });

    return NextResponse.json({ 
      message: 'Classification saved successfully', 
      classificationId: classification.id 
    }, { status: 200 });

  } catch (error) {
    console.error('Error saving classification:', error);
    return NextResponse.json({ 
      error: 'Failed to save classification' 
    }, { status: 500 });
  }
}