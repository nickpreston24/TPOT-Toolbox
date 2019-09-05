import React, { Fragment, Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import { observable, action} from 'mobx'
import { compose } from 'recompose'
// import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import { Menu, MenuItem } from '@material-ui/core';
import { Link, withRouter, } from 'react-router-dom';

const capitalize = string => {
	return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
};

const routes = [
	[
		{
			primaryText: 'Letters',
			secondaryText: 'Convert Emails to Web Pages',
			to: '/letters',
			// to: '/letters/about-clean-meats/publish',
			icon: null,
			action: () => { },
		},
		{
			primaryText: 'Settings',
			secondaryText: 'Adjust Toolbox Preferences',
			to: '/settings',
			icon: null,
			action: () => { },
		},
	],
	[
		{
			primaryText: 'about-clean-meats',
			to: '/letters/about-clean-meats',
			icon: null,
			action: () => { },
		},
	],
	[
		{
			primaryText: 'Save',
			icon: null,
			to: '/letters/about-clean-meats/save',
			action: () => { },
		},
		{
			primaryText: 'Load',
			icon: null,
			to: '/letters/about-clean-meats/load',
			action: () => { },
		},
		{
			primaryText: 'Drafts',
			icon: null,
			to: '/letters/about-clean-meats/drafts',
			action: () => { },
		},
		{
			primaryText: 'Publish',
			icon: null,
			to: '/letters/about-clean-meats/publish',
			action: () => { },
		},
		{
			primaryText: 'Preview',
			icon: null,
			to: '/letters/about-clean-meats/preview',
			action: () => { },
		},
		{
			primaryText: 'Clear',
			icon: null,
			to: '/letters/about-clean-meats/clear',
			action: () => { },
		},

	]
]

const styles = theme => ({
	root: {
		marginLeft: 15,
		// zIndex: 9999,
		// position: 'fixed',
		// top: 0,
		// left: 0,
		// color: 'red !important',
		// fontSize: 8,
		// padding: '10px 30px',
		'& ol': {
			flexWrap: 'nowrap',
		},
	},
	burger: {
		paddingTop: '20px !important',
		paddingLeft: '0px !important',
		'& .BurgerBox div, div:before, div:after': {
			background: theme.palette.text.primary,
		}
	},
	typography: {
		color: theme.palette.text.primary,
		fontWeight: 400,
		// padding: '10px 10px',
	},
	chip: {
		// backgroundColor: theme.palette.grey[100],
		height: 24,
		padding: 4,
		color: theme.palette.text.secondary,
		fontWeight: theme.typography.fontWeightRegular,
		background: 'transparent',
		'&:hover, &:focus': {
			backgroundColor: `rgba(119, 119, 119, 0.1)`,
		},
		'&.active': {
			backgroundColor: `rgba(119, 119, 119, 0.1)`,
			// boxShadow: theme.shadows[1],
			//   backgroundColor: emphasize(theme.palette.grey[300], 0.12),
		},
	},
});

class RoutedBreadCrumbsClass extends Component {

	@observable burgerActive = false
	@observable menuOpen = false
	@observable anchorEl = null
	@observable paths = {}

	@action toggleBurger = () => {
		this.burgerActive = !this.burgerActive
	}

	@action handleClick = (event, paths) => {
		// console.log(toJS(event.currentTarget))
		// console.log(paths.first, paths.last)
		if (paths.first === paths.last) {
			this.burgerActive = !this.burgerActive
			// console.log('toggle')
		}
		// (paths.first && paths.last) && this.toggleBurger()
		// this.menuOpen = !this.menuOpen
		this.anchorEl = event.currentTarget
		this.paths = paths
	}

	@action handleClose = () => {
		// console.log('close')
		// this.menuOpen = false
		this.anchorEl = null
		this.burgerActive = false
		// console.log(this.anchorEl)
	}

	render() {
		const { store, classes, location, match, theme } = this.props;
		const { toggleMenu, menuOpen, handleClick, anchorEl, handleClose } = this
		let app = capitalize(match.params.app || 'Dashboard')
		let action = capitalize(match.params.action || 'Publish')
		const pathnames = location.pathname.split('/').filter(x => x)
		// console.log(location, match)
		return (
			<Fragment>
				{/* <Breadcrumbs
					className={classes.root}
					maxItems={3}
					separator={''}
				>
					{pathnames.map((value, index) => {
						const first = index === 0
						const to = `/${pathnames.slice(0, index + 1).join('/')}`;
						const label = `${capitalize(pathnames[index])}`
						const last = index === pathnames.length - 1;
						// console.log(first, to, last, label)

						// console.log(routes, index)

						return (
							// <Link
							// 	onClick={(e) => handleClick(e, { first, to, last, label, index })}
							// 	to={to}
							// 	key={index}
							// 	style={{ textDecoration: 'none' }}
							// >
								<Chip
									onClick={(e) => handleClick(e, { first, to, last, label, index })}
									className={classNames(classes.chip, (last && !first) && 'active')}
									label={
										<Fragment>
											{first && (
												<Slider
													width={20}
													lineHeight={3}
													lineSpacing={3}
													borderRadius={4}
													className={classes.burger}
													active={(menuOpen && first)}
												/>
											)}
											<Typography
												noWrap
												variant={first ? 'h6' : null}
												className={classes.typography}
											>
												{label}
											</Typography>
										</Fragment>
									}
									icon={!first ? <FontAwesomeIcon icon={faPaperPlane} style={{ margin: 5 }} size="1x" /> : null}
									deleteIcon={<FontAwesomeIcon icon={faCaretDown} style={{ margin: 5 }} size="lg" />}
									onDelete={() => { console.log('menu') }}
								/>
							// </Link>
						)
					})}

				</Breadcrumbs> */}
				<Menu
					disableAutoFocusItem
					open={Boolean(anchorEl)}
					anchorEl={anchorEl}
					onClose={handleClose}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'center',
					}}
					transformOrigin={{
						vertical: 'top',
						horizontal: 'center',
					}}
				>
					{routes[0].map((route, index) => {
						return (
							<Link
								to={route.to}
								key={index}
								style={{ textDecoration: 'none' }}
							>
								<MenuItem onClick={this.handleClose}>{route.primaryText}</MenuItem>
							</Link>
						)
					})}
					{/* {this.paths.index + 1 && routes[this.paths.index + 1 ].map((route, index) => {
//						console.log(route, index)
						return (
							<Link
								to={route.to}
								key={index}
								style={{ textDecoration: 'none' }}
							>
								<MenuItem onClick={this.handleClose}>{route.primaryText}</MenuItem>
							</Link>
						)
					})} */}
				</Menu>
			</Fragment>
		)
	}
}

export const RoutedBreadCrumbs = compose(
    inject('store'),
    withStyles(styles),
    withRouter,
    observer,
)(RoutedBreadCrumbsClass)