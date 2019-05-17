import React, { Component } from 'react';
import Library from '../presentation/Library';
import Catalog from '../config/catalog'
import { observable } from 'mobx';
import { Route, Switch } from 'react-router-dom'
import VideoPage from '../presentation/VideoPage';

export default class LibraryContainer extends Component {
    
    @observable catalog = Catalog
    
    render() {
        const { catalog } = this

        const entry =     {
            id: 'fLjslMtjkhs',
            title: 'Harvest Haven Pastured Poultry – Free Range Living',
            description: 'Harvest Haven laying hens, broilers, and turkeys are truly pasture raised and free range.  Our birds are in the pasture during the growing season where they get to scratch, hunt for bugs, and eat all the greens they want.\nIf there’s one thing we’ve learned, it’s that healthy birds need lots of sunlight and salad. And if a chicken or a turkey doesn’t have the ability and freedom to express every part of its scratchy, diggy little personality, something’s wrong with how they’re being raised.'
          }

        return (
            <Switch>
                <Route exact path={`/library/:category`} children={() => <Library {...{ catalog }} /> }/>
                <Route path={`/library/:category/:id`} children={({match, history}) => <VideoPage {...{ entry, match, history, catalog }} /> }/>
            </Switch>
        )
    }
}
