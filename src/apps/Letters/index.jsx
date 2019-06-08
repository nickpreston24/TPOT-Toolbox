// React
import React, { Component, Fragment } from 'react';
import PublishScreenContainer from './containers/PublishScreenContainer';
import Editor from '../Editor/Editor';
import ModalLoad from './containers/ModalLoad';
import { BrowserRouter, Link, Route, Redirect, Switch, withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { observable, action } from 'mobx'
import { RoutedModal } from './containers/RoutedModal';

@observer
class Letters extends Component {

    constructor(props) {
        super(props);

        this.state = { // set default state for App (single source of truth)
            editMode: "edited"
        }
    }

    @observable container = null

    @action setContainer = (element) => {
        this.container = element
    }

    onUpdateHeader = async (headerState) => {
        await this.setState({
            menuToggled: headerState.menuToggled,
            editMode: headerState.editMode
        })
    }

    render() {
        const { location, match } = this.props
        const { container } = this
        // console.log({ location, match })
        // console.log(this.container)
        return (
            <div className="Letters" style={{ flexGrow: 1 }} ref={this.setContainer}>
                <Editor />
                <PublishScreenContainer {...{  container }} />
                <ModalLoad />
                {/* <Route path={`/letters/:command`} render={
                    ({ location, match, history }) => {
                        return (
                            <Fragment>
                                <Switch location={location} >
                                    <Route path={`${match.path}/publish`} render={() => <PublishScreenContainer {...{ match, history, container }} />} />
                                </Switch>
                            </Fragment>
                        )
                    }
                } /> */}
            </div>
        )
    }

}

export default Letters

