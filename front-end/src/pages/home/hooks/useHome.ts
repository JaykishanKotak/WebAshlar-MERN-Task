import { toggleLoader } from '@store/common/commonSlice'
import APICall from '@utils/APICall'
import { confirmMessagePopUp } from '@utils/CommonFucntions'
import { Const } from '@utils/Const'
import { EndPoints } from '@utils/EndPoints'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const columns = [
  {
    name: 'Start Time',
    value: 'start_time'
  },
  {
    name: 'End Time',
    value: 'end_time'
  },
  {
    name: 'Title',
    value: 'title'
  },
  {
    name: 'Description',
    value: 'description'
  },
  {
    name: 'Meeting Date',
    value: 'meeting_date'
  }
]

const actions = [{ label: 'Edit' }, { label: 'Delete' }]

const useHome = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [meetingData, setMeetingData] = useState([])
  const [recordCount, setRecordCount] = useState(0)
  const [page, setPage] = useState(1)

  const fetchMeetingData = () => {
    const payload = {
      limit: Const.DEFAULT_PAGE_SIZE,
      pageNumber: page
    }
    dispatch(toggleLoader(true))
    APICall('GET', payload, EndPoints.MEETING)
      .then((res: any) => {
        if (res.data.count > 0) {
          setMeetingData(res.data.meetings)
          setRecordCount(res.data.count)
        }
      })
      .catch(() => {
        setMeetingData([])
        setRecordCount(0)
      })
      .finally(() => {
        dispatch(toggleLoader(false))
      })
  }

  const onEditMeeting = (row: any) => {
    navigate(Const.ROUTES.MEETING, { state: row })
  }

  const onDeleteMeeting = (row: any) => {
    confirmMessagePopUp('Are you sure you want to delete this meeting?', () => {
      dispatch(toggleLoader(true))
      const payload = {
        meetingId: row?._id
      }
      APICall('DELETE', payload, EndPoints.MEETING)
        .then((res: any) => {
          toast.success(res?.message)
          fetchMeetingData()
        })
        .catch((err) => {
          toast.error(err?.message)
        })
        .finally(() => {
          dispatch(toggleLoader(false))
        })
    })
  }

  const onActionClick = (action: { label: string }, row: any) => {
    switch (action.label) {
      case 'Edit':
        onEditMeeting(row)
        break
      case 'Delete':
        onDeleteMeeting(row)
        break
      default:
        break
    }
  }

  const onChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage)
  }

  const onClickAddMeeting = () => {
    navigate(Const.ROUTES.MEETING)
  }

  useEffect(() => {
    fetchMeetingData()
  }, [page])

  return {
    columns,
    actions,
    onActionClick,
    onClickAddMeeting,
    meetingData,
    onChangePage,
    page,
    recordCount
  }
}

export default useHome
