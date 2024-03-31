import {
	IconBell,
	IconChartDots3,
	IconColorSwatch,
	IconLayoutSidebarFilled,
	IconLogout,
	IconSettings,
	IconTags,
	IconVocabulary,
} from '@tabler/icons-react'
import Image from './Image'
import { NavLink, useNavigate } from 'react-router-dom'

export default function Sidebar() {
	const navigate = useNavigate()
	function Logout() {
		document.cookie =
			'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
		document.cookie =
			'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
		navigate('/signin')
	}
	return (
		<div>
			<nav id="sidebar">
				<div className="flex flex-col py-6 text-sm bg-secondary">
					<div className="flex items-center gap-2 px-6 py-3">
						<Image
							className={'object-cover h-10 w-10 rounded-full'}
							height={25}
							width={25}
						/>
						<div className="flex flex-col">
							<h1 className="text-lg font-bold text-yellow-500 font-poppins">
								thoughtlist
							</h1>
							<p className="text-xs text-gray-600">Personal Blog</p>
						</div>
					</div>
					<div className="flex flex-col gap-2">
						<div className="py-6 mx-3 border-b-2">
							<SidebarMenu text={'Dashboard'} to={'/dashboard'}>
								<IconLayoutSidebarFilled />
							</SidebarMenu>
							<SidebarMenu text={'Posts'} to={'/dashboard/posts'}>
								<IconVocabulary />
							</SidebarMenu>
							<SidebarMenu text={'Tags'} to={'/dashboard/tags'}>
								<IconTags />
							</SidebarMenu>
							<SidebarMenu
								text={'Notification'}
								to={'/dashboard/notifications'}>
								<IconBell />
							</SidebarMenu>
						</div>
						<div className="mx-3">
							<SidebarMenu text={'Analytics'} to={'/dashboard/analytics'}>
								<IconChartDots3 />
							</SidebarMenu>
							<SidebarMenu text={'Theme'} to={'/dashboard/theme'}>
								<IconColorSwatch />
							</SidebarMenu>
							<SidebarMenu text={'Settings'} to={'/dashboard/settings'}>
								<IconSettings />
							</SidebarMenu>

							<button onClick={Logout}>
								<IconLogout />
							</button>
						</div>
					</div>
				</div>
			</nav>
		</div>
	)
}

function SidebarMenu({ to, text, children }) {
	return (
		<div>
			<NavLink
				to={to}
				className={
					'text-gray-500 active:text-yellow-500 hover:bg-slate-100 transition-all duration-300 ease-in-out rounded-lg px-3 py-1.5 flex gap-2 items-center'
				}>
				{children}
				{text}
			</NavLink>
		</div>
	)
}
