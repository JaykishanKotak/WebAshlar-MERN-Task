import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import APICall from '@utils/APICall'
import { EndPoints } from '@utils/EndPoints'
import { toast } from 'react-toastify'
import { Const } from '@utils/Const'
import { trim } from 'lodash'
import { useDispatch } from 'react-redux'
import { toggleLoader } from '@store/common/commonSlice'

interface SignUpData {
  email?: string
  name?: string
  password?: string
  confirmPassword?: string
}

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email')
    .transform((val) => trim(val))
    .required('Email is required'),
  name: yup
    .string()
    .transform((val) => trim(val))
    .required('Please Enter Your Name'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .transform((val) => trim(val))
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([(yup as any).ref('password'), null], 'Passwords must match')
    .transform((val) => trim(val))
    .required('Confirm Password is required')
})

const useSignUp = () => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      name: '',
      password: '',
      confirmPassword: ''
    }
  })

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const onSubmit = async (data: SignUpData) => {
    const { name, email, password } = data
    const payload = {
      name,
      email,
      password
    }
    dispatch(toggleLoader(true))
    APICall('POST', payload, EndPoints.REGISTER)
      .then((res: any) => {
        toast.success(res.message)
        navigate(Const.ROUTES.LOGIN)
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
    onSubmit,
    errors
  }
}

export default useSignUp
