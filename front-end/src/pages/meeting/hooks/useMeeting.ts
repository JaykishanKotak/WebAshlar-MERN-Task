import { yupResolver } from '@hookform/resolvers/yup'
import { toggleLoader } from '@store/common/commonSlice'
import APICall from '@utils/APICall'
import { EndPoints } from '@utils/EndPoints'
import { trim } from 'lodash'
import moment from 'moment'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as yup from 'yup'

interface MeetingData {
  title: string
  description?: string
  startTime: string
  endTime: string
  meetingDate: Date
  attendees: any[]
  meetingId?: string
}

const schema = yup.object().shape({
  title: yup
    .string()
    .transform((val) => trim(val))
    .required('Title is required'),
  description: yup
    .string()
    .transform((val) => trim(val))
    .required('Description is required'),
  startTime: yup
    .string()
    .transform((val) => trim(val))
    .required('start time cannot be empty'),
  endTime: yup
    .string()
    .transform((val) => trim(val))
    .required('end time cannot be empty')
    .test('is-greater', 'end time should be greater', function (value) {
      const { startTime } = this.parent
      return moment(value, 'HH:mm').isSameOrAfter(moment(startTime, 'HH:mm'))
    }),

  attendees: yup
    .array()
    .min(1, 'Please select at least one attendee')
    .required(),
  meetingDate: yup.date().required('Please select meeting date')
})

const useMeeting = () => {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<any>({
    resolver: yupResolver(schema)
  })

  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const editData = location.state

  const onSubmit = async (data: MeetingData) => {
    dispatch(toggleLoader(true))
    const method = editData._id ? 'PUT' : 'POST'
    if (editData._id) {
      data.meetingId = editData._id
    }
    APICall(method, data, EndPoints.MEETING)
      .then((res: any) => {
        toast.success(res.message)
        navigate(-1)
      })
      .catch(() => {})
      .finally(() => {
        dispatch(toggleLoader(false))
      })
  }

  const fetchMeetingDetails = () => {
    const payload = {
      meetingId: editData._id
    }
    dispatch(toggleLoader(true))
    APICall('GET', payload, EndPoints.MEETING_DETAILS)
      .then((res: any) => {
        setValue('startTime', res.data.start_time)
        setValue('endTime', res.data.end_time)
        setValue('title', res.data.title)
        setValue('description', res.data.description)
        setValue(
          'meetingDate',
          res.data.meeting_date
            ? moment(res.data.meeting_date, 'YYYY-MM-DD').toDate()
            : null
        )
        if (res?.data?.attendees.length > 0) {
          setValue('attendees', res?.data?.attendees)
        }
      })
      .catch(() => {})
      .finally(() => {
        dispatch(toggleLoader(false))
      })
  }

  useEffect(() => {
    if (editData?._id) {
      fetchMeetingDetails()
    }
  }, [editData])

  return { handleSubmit, control, onSubmit, errors, editData, watch }
}

export default useMeeting
