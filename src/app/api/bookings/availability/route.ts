import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/bookings/availability - Get available time slots for a facility
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const facilityId = searchParams.get('facilityId')
    const date = searchParams.get('date')
    
    if (!facilityId || !date) {
      return NextResponse.json(
        { error: 'facilityId and date are required' },
        { status: 400 }
      )
    }

    const targetDate = new Date(date)
    if (isNaN(targetDate.getTime())) {
      return NextResponse.json(
        { error: 'Invalid date format' },
        { status: 400 }
      )
    }

    // Get facility
    const facility = await prisma.facility.findUnique({
      where: { id: parseInt(facilityId) },
      select: {
        id: true,
        name: true,
        hourlyRate: true,
        active: true
      }
    })

    if (!facility || !facility.active) {
      return NextResponse.json(
        { error: 'Facility not found or inactive' },
        { status: 404 }
      )
    }

    // Get day of week (0 = Sunday, 1 = Monday, etc.)
    const dayOfWeek = targetDate.getDay()

    // Get availability settings for this facility and day
    const availability = await prisma.bookingAvailability.findUnique({
      where: {
        facilityId_dayOfWeek: {
          facilityId: parseInt(facilityId),
          dayOfWeek
        }
      }
    })

    // Default availability if not set
    const defaultStart = "09:00"
    const defaultEnd = "22:00"
    const startTime = availability?.startTime || defaultStart
    const endTime = availability?.endTime || defaultEnd
    const isAvailable = availability?.isAvailable ?? true

    if (!isAvailable) {
      return NextResponse.json({
        facility,
        date: targetDate.toISOString().split('T')[0],
        dayOfWeek,
        available: false,
        timeSlots: [],
        message: 'Facility is not available on this day'
      })
    }

    // Get existing bookings for this day
    const startOfDay = new Date(targetDate)
    startOfDay.setHours(0, 0, 0, 0)
    
    const endOfDay = new Date(targetDate)
    endOfDay.setHours(23, 59, 59, 999)

    const existingBookings = await prisma.booking.findMany({
      where: {
        facilityId: parseInt(facilityId),
        status: { in: ['pending', 'confirmed'] },
        startDateTime: { gte: startOfDay },
        endDateTime: { lte: endOfDay }
      },
      select: {
        startDateTime: true,
        endDateTime: true
      },
      orderBy: { startDateTime: 'asc' }
    })

    // Generate available time slots (30-minute intervals)
    const timeSlots = []
    const [startHour, startMinute] = startTime.split(':').map(Number)
    const [endHour, endMinute] = endTime.split(':').map(Number)

    const slotStart = new Date(targetDate)
    slotStart.setHours(startHour, startMinute, 0, 0)

    const dayEnd = new Date(targetDate)
    dayEnd.setHours(endHour, endMinute, 0, 0)

    const now = new Date()
    const minBookingTime = new Date(now.getTime() + 2 * 60 * 60 * 1000) // 2 hours from now

    while (slotStart < dayEnd) {
      const slotEnd = new Date(slotStart.getTime() + 30 * 60 * 1000) // 30 minutes later

      // Check if this slot is in the past or too soon
      const isPastOrTooSoon = slotStart < minBookingTime

      // Check if this slot conflicts with existing bookings
      const hasConflict = existingBookings.some(booking => {
        const bookingStart = new Date(booking.startDateTime)
        const bookingEnd = new Date(booking.endDateTime)
        return slotStart < bookingEnd && slotEnd > bookingStart
      })

      timeSlots.push({
        startTime: slotStart.toISOString(),
        endTime: slotEnd.toISOString(),
        startTimeDisplay: slotStart.toLocaleTimeString('en-GB', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false 
        }),
        endTimeDisplay: slotEnd.toLocaleTimeString('en-GB', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false 
        }),
        available: !hasConflict && !isPastOrTooSoon,
        reason: hasConflict ? 'booked' : isPastOrTooSoon ? 'too_soon' : null
      })

      slotStart.setMinutes(slotStart.getMinutes() + 30)
    }

    return NextResponse.json({
      facility,
      date: targetDate.toISOString().split('T')[0],
      dayOfWeek,
      available: true,
      operatingHours: {
        start: startTime,
        end: endTime
      },
      timeSlots,
      existingBookings: existingBookings.length
    })
  } catch (error) {
    console.error('Error fetching availability:', error)
    return NextResponse.json(
      { error: 'Failed to fetch availability' },
      { status: 500 }
    )
  }
}