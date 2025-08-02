import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { checkAuth } from '@/lib/auth-middleware'

// GET /api/bookings/[id] - Get specific booking
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid booking ID' },
        { status: 400 }
      )
    }

    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        facility: {
          select: {
            id: true,
            name: true,
            hourlyRate: true,
            capacity: true,
            features: true
          }
        }
      }
    })

    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(booking)
  } catch (error) {
    console.error('Error fetching booking:', error)
    return NextResponse.json(
      { error: 'Failed to fetch booking' },
      { status: 500 }
    )
  }
}

// PUT /api/bookings/[id] - Update booking (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Check authentication for admin operations
  const isAuthed = await checkAuth(request)
  if (!isAuthed) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const id = parseInt(params.id)
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid booking ID' },
        { status: 400 }
      )
    }

    const body = await request.json()
    const {
      status,
      notes,
      customerName,
      customerEmail,
      customerPhone,
      eventTitle,
      eventDescription,
      startDateTime,
      endDateTime
    } = body

    // Get existing booking
    const existingBooking = await prisma.booking.findUnique({
      where: { id },
      include: { facility: true }
    })

    if (!existingBooking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      )
    }

    const updateData: any = {}

    if (status !== undefined) updateData.status = status
    if (notes !== undefined) updateData.notes = notes
    if (customerName !== undefined) updateData.customerName = customerName
    if (customerEmail !== undefined) updateData.customerEmail = customerEmail
    if (customerPhone !== undefined) updateData.customerPhone = customerPhone
    if (eventTitle !== undefined) updateData.eventTitle = eventTitle
    if (eventDescription !== undefined) updateData.eventDescription = eventDescription

    // Handle datetime updates
    if (startDateTime || endDateTime) {
      const start = startDateTime ? new Date(startDateTime) : existingBooking.startDateTime
      const end = endDateTime ? new Date(endDateTime) : existingBooking.endDateTime

      if (start >= end) {
        return NextResponse.json(
          { error: 'End time must be after start time' },
          { status: 400 }
        )
      }

      // Check for conflicts (excluding current booking)
      const conflictingBookings = await prisma.booking.findMany({
        where: {
          facilityId: existingBooking.facilityId,
          id: { not: id },
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

      updateData.startDateTime = start
      updateData.endDateTime = end

      // Recalculate total hours and cost
      const totalHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60)
      const hourlyRate = existingBooking.facility.hourlyRate ? parseFloat(existingBooking.facility.hourlyRate.toString()) : 0
      
      updateData.totalHours = totalHours
      updateData.totalCost = hourlyRate > 0 ? totalHours * hourlyRate : null
    }

    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: updateData,
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

    return NextResponse.json(updatedBooking)
  } catch (error) {
    console.error('Error updating booking:', error)
    return NextResponse.json(
      { error: 'Failed to update booking' },
      { status: 500 }
    )
  }
}

// DELETE /api/bookings/[id] - Cancel booking
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Check authentication for admin operations
  const isAuthed = await checkAuth(request)
  if (!isAuthed) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const id = parseInt(params.id)
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid booking ID' },
        { status: 400 }
      )
    }

    // Update status to cancelled instead of hard delete
    await prisma.booking.update({
      where: { id },
      data: { status: 'cancelled' }
    })

    return NextResponse.json({ message: 'Booking cancelled successfully' })
  } catch (error) {
    console.error('Error cancelling booking:', error)
    return NextResponse.json(
      { error: 'Failed to cancel booking' },
      { status: 500 }
    )
  }
}