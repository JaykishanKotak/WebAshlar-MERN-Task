import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { EndPoints } from '@utils/EndPoints'
import APICall from '@utils/APICall'
import { setUserInfo } from '@store/user/userSlice'
import { Const } from '@utils/Const'
import { trim } from 'lodash'
import { toggleLoader } from '@store/common/commonSlice'

interface LoginData {
  email: string
  password: string
}

const schema = yup.object().shape({
  email: yup
    .string()
    .transform((val) => trim(val))
    .email('Please enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .transform((val) => trim(val))
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required')
})

const useLogin = () => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: ''
    }
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onSubmit = async (data: LoginData) => {
    const { email, password } = data
    const payload = {
      email,
      password
    }
    dispatch(toggleLoader(true))
    APICall('POST', payload, EndPoints.LOGIN)
      .then((res: any) => {
        const { userInfo, message, token } = res
        localStorage.setItem('@userInfo', JSON.stringify(userInfo))
        localStorage.setItem('@token', token)
        dispatch(setUserInfo(userInfo))
        toast.success(message)
        navigate(Const.ROUTES.HOME)
      })
      .catch((err) => {
        toast.error(err.message)
      })
      .finally(() => {
        dispatch(toggleLoader(false))
      })
  }

  return {
    control,
    handleSubmit,
    errors,
    onSubmit
  }
}

export default useLogin
