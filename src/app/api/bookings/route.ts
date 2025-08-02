import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { checkAuth } from '@/lib/auth-middleware'

// GET /api/bookings - Get all bookings (admin only)
export async function GET(request: NextRequest) {
  // Check authentication for admin operations
  const isAuthed = await checkAuth(request)
  if (!isAuthed) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const { searchParams } = new URL(request.url)
    const facilityId = searchParams.get('facilityId')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    const status = searchParams.get('status')

    const where: any = {}
    
    if (facilityId) {
      where.facilityId = parseInt(facilityId)
    }
    
    if (startDate || endDate) {
      where.startDateTime = {}
      if (startDate) {
        where.startDateTime.gte = new Date(startDate)
      }
      if (endDate) {
        where.startDateTime.lte = new Date(endDate)
      }
    }
    
    if (status) {
      where.status = status
    }

    const bookings = await prisma.booking.findMany({
      where,
      include: {
        facility: {
          select: {
            id: true,
            name: true,
            hourlyRate: true
          }
        }
      },
      orderBy: { startDateTime: 'asc' }
    })

    return NextResponse.json(bookings)
  } catch (error) {
    console.error('Error fetching bookings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    )
  }
}

// POST /api/bookings - Create a new booking
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      facilityId,
      customerName,
      customerEmail,
      customerPhone,
      eventTitle,
      eventDescription,
      startDateTime,
      endDateTime,
      notes
    } = body

    // Validate required fields
    if (!facilityId || !customerName || !customerEmail || !eventTitle || !startDateTime || !endDateTime) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const start = new Date(startDateTime)
    const end = new Date(endDateTime)

    // Validate date range
    if (start >= end) {
      return NextResponse.json(
        { error: 'End time must be after start time' },
        { status: 400 }
      )
    }

    // Check if facility exists
    const facility = await prisma.facility.findUnique({
      where: { id: facilityId },
      select: { id: true, hourlyRate: true, active: true }
    })

    if (!facility || !facility.active) {
      return NextResponse.json(
        { error: 'Facility not found or inactive' },
        { status: 404 }
      )
    }

    // Check for booking conflicts
    const conflictingBookings = await prisma.booking.findMany({
      where: {
        facilityId,
        status: { in: ['pending', 'confirmed'] },
        OR: [
          {
            startDateTime: { lt: end },
            endDateTime: { gt: start }
          }
        ]
      }
    })

    if (conflictingBookings.length > 0) {
      return NextResponse.json(
        { error: 'Time slot not available' },
        { status: 409 }
      )
    }

    // Calculate total hours and cost
    const totalHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60)
    const hourlyRate = facility.hourlyRate ? parseFloat(facility.hourlyRate.toString()) : 0
    const totalCost = hourlyRate > 0 ? totalHours * hourlyRate : null

    const booking = await prisma.booking.create({
      data: {
        facilityId,
        customerName,
        customerEmail,
        customerPhone,
        eventTitle,
        eventDescription,
        startDateTime: start,
        endDateTime: end,
        totalHours,
        hourlyRate: facility.hourlyRate,
        totalCost,
        notes,
        status: 'pending'
      },
      include: {
        facility: {
          select: {
            id: true,
            name: true,
            hourlyRate: true
          }
        }
      }
    })

    return NextResponse.json(booking, { status: 201 })
  } catch (error) {
    console.error('Error creating booking:', error)
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    )
  }
}