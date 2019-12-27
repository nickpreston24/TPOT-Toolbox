import React, { Component } from 'react';
import PublishScreenContainer from './PublishScreenContainer';
import Editor from '../Editor/Editor';
import Uploader from './Uploader';
import ModalFirebase from '../Toolbox/views/ModalFirebase';
import { observer } from 'mobx-react'
import { observable, action } from 'mobx'
import CloudFilesProvider from '../../contexts/CloudFiles';

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
                <CloudFilesProvider>

                    <Editor />
                    {/* Temporary place for modals until Toolbox manages them in CurrentApp */}
                    {/* <PublishScreenContainer {...{ container }} /> */}

                    <Uploader />

                    <ModalFirebase />
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
                </CloudFilesProvider>
            </div>
        )
    }

}

export default Letters

