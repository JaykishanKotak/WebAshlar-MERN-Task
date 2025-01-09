import { Meeting } from '@utils/CommonInterface'
import { useState } from 'react'

const schedules: Meeting[] = [
  {
    id: 1,
    date: '2024-12-29',
    time: '10:00 AM',
    topic: 'Team Sync',
    location: 'Zoom'
  },
  {
    id: 11,
    date: '2024-12-29',
    time: '12:00 AM',
    topic: 'Team Sync',
    location: 'Zoom'
  },
  {
    id: 12,
    date: '2024-12-29',
    time: '14:00 AM',
    topic: 'Team Sync',
    location: 'Zoom'
  },
  {
    id: 13,
    date: '2024-12-29',
    time: '16:00 AM',
    topic: 'Team Sync',
    location: 'Zoom'
  },
  {
    id: 2,
    date: '2024-12-30',
    time: '2:00 PM',
    topic: 'Project Update',
    location: 'Office'
  },
  {
    id: 3,
    date: '2024-12-31',
    time: '9:00 AM',
    topic: 'Client Meeting',
    location: 'Google Meet'
  }
]

const useCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null)

  const onChangeDate: any = (date: Date) => {
    setSelectedDate(date)

    const selectedDateStr = date.toISOString().split('T')[0]

    // Filter meetings for the selected date
    const meetingsOnSelectedDate = schedules.filter(
      (meeting) => meeting.date === selectedDateStr
    )

    if (meetingsOnSelectedDate.length > 0) {
      // Check for a specific time if necessary (e.g., select the first meeting by default)
      const currentTime = date.getHours() * 100 + date.getMinutes() // Get the current time in HHMM format

      const meetingAtTime = meetingsOnSelectedDate.find((meeting) => {
        const [hours, minutes] = meeting.time.split(':')
        const meetingTime = Number(hours) * 100 + Number(minutes)
        return meetingTime === currentTime
      })

      if (meetingAtTime) {
        setSelectedMeeting(meetingAtTime)
        setOpenDialog(true)
      } else {
        setSelectedMeeting(meetingsOnSelectedDate[0])
        setOpenDialog(true)
      }
    } else {
      setSelectedMeeting(null)
      setOpenDialog(false)
    }
  }

  const onClickDialogClose = () => {
    setOpenDialog(false)
    setSelectedMeeting(null)
  }

  return {
    selectedDate,
    selectedMeeting,
    openDialog,
    onChangeDate,
    onClickDialogClose,
    schedules
  }
}

export default useCalendar
