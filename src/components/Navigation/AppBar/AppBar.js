import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'

export default function MenuAppBar(props) {
	const [anchorEl, setAnchorEl] = React.useState(null)
	const open = Boolean(anchorEl)

	const handleMenu = event => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}
	return (
		<Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
			<Navbar.Brand>
				<Link
					to="/"
					style={{ color: 'inherit', textDecoration: 'none' }}
				>
					کانال یاب
				</Link>
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="mr-auto">
					<Nav.Link>
						<Link
							to="/new-post"
							style={{ color: 'inherit', textDecoration: 'none' }}
						>
							پست جدید
						</Link>
					</Nav.Link>
					{!props.isAuthenticated && (
						<Nav.Link>
							<Link
								to="/login"
								style={{
									color: 'inherit',
									textDecoration: 'none'
								}}
							>
								ورود
							</Link>
						</Nav.Link>
					)}
				</Nav>
				<Nav>
					{props.isAuthenticated && (
						<div>
							<IconButton
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleMenu}
								style={{ color: 'white' }}
							>
								<AccountCircle />
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={anchorEl}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right'
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right'
								}}
								open={open}
								onClose={handleClose}
							>
								<MenuItem onClick={handleClose}>
									<Link
										to="/profile"
										style={{
											textDecoration: 'none'
										}}
									>
										پروفایل
									</Link>
								</MenuItem>
								<MenuItem
									onClick={() => {
										handleClose()
										props.onLogOut()
									}}
								>
									خروح
								</MenuItem>
							</Menu>
						</div>
					)}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	)
}
