import React, { Component, Fragment } from 'react'
import { Modal } from '../../../components/UI'

const withErrorHandler = (WrappedComponent, axios) => {
	return class extends Component {
		constructor(props) {
			super(props)
			this.reqInterceptor = axios.interceptors.request.use(req => {
				this.setState({ error: null })
				return req
			})
			this.resInterceptor = axios.interceptors.response.use(
				req => req,
				error => {
					this.setState({ error })
					return Promise.reject(error)
				}
			)
		}

		state = {
			error: null
		}

		componentWillUnmount() {
			axios.interceptors.response.eject(this.reqInterceptor)
			axios.interceptors.request.eject(this.reqInterceptor)
		}

		errorConfirmed = () => {
			this.setState({ error: null })
		}

		render() {
			const { error } = this.state
			return (
				<Fragment>
					<Modal show={error} closeModal={this.errorConfirmed}>
						{error ? error.message : null}
					</Modal>
					<WrappedComponent {...this.props} />
				</Fragment>
			)
		}
	}
}

export default withErrorHandler
