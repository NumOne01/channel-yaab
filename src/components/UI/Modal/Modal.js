import React, { Fragment, Component } from 'react'
import classes from './Modal.module.css'
import Backdrop from '../Backdrop/Backdrop'
import { CSSTransition } from 'react-transition-group'

class Modal extends Component {
	shouldComponentUpdate(nextProps) {
		return (
			this.props.show !== nextProps.show ||
			this.props.children !== nextProps.children
		)
	}
	render() {
		return (
			<Fragment>
				<Backdrop
					show={this.props.show}
					clicked={this.props.closeModal}
				/>
				<CSSTransition
					in={this.props.show}
					timeout={400}
					mountOnEnter
					unmountOnExit
					classNames={{
						enterActive: classes.ModalOpen,
						exitActive: classes.ModalClose
					}}
				>
					<div className={classes.Modal}>
						<div>{this.props.children}</div>
					</div>
				</CSSTransition>
			</Fragment>
		)
	}
}

export default Modal
