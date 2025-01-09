import { RootState } from '@store/store'
import { logout } from '@store/user/userSlice'
import { Const } from '@utils/Const'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const useHeader = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state: RootState) => state.user.userInfo)

  const pages = isAuthenticated ? ['Home', 'Calendar'] : ['Login', 'Register']
  const settings = isAuthenticated
    ? ['Profile', 'Logout']
    : ['Login', 'Register']

  const onClickOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const onClickOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const onClickCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const onClickCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const onClickLogout = () => {
    localStorage.clear()
    dispatch(logout())
    window.location.href = '/'
    navigate(Const.ROUTES.LOGIN)
  }

  const onClickSettings = (setting: string) => {
    switch (setting) {
      case 'Profile':
        navigate(Const.ROUTES.PROFILE)
        break
      case 'Logout':
        onClickLogout()
        break
      case 'Login':
        navigate(Const.ROUTES.LOGIN)
        break
      case 'Register':
        navigate(Const.ROUTES.REGISTER)
        break
      default:
        break
    }
  }

  const onClickPage = (page: string) => {
    switch (page) {
      case 'Home':
        navigate(Const.ROUTES.HOME)
        break
      case 'Calendar':
        navigate(Const.ROUTES.CALANDER)
        break
      case 'Login':
        navigate(Const.ROUTES.LOGIN)
        break
      case 'Register':
        navigate(Const.ROUTES.REGISTER)
        break
      default:
        break
    }
  }

  return {
    anchorElNav,
    anchorElUser,
    pages,
    onClickOpenNavMenu,
    onClickOpenUserMenu,
    onClickCloseNavMenu,
    onClickCloseUserMenu,
    onClickLogout,
    onClickPage,
    settings,
    onClickSettings
  }
}

export default useHeader
