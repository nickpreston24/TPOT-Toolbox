import React, { Component } from 'react'
import { compose } from 'recompose'
import { inject, observer } from 'mobx-react';
import { Route, Switch } from 'react-router-dom'
import { Collection } from 'firestorter';

const users = new Collection('users')

export const CheckoutPage = compose(
    inject('store'),
    observer
)(
    class CheckoutPage extends Component {

        render() {
            return (
                <div>
                    {users.docs.map((doc) => (
                        <UserItem key={doc.id} doc={doc} />
                    ))}
                </div>
            )
        }
    }
)

export const UserItem = compose(
    inject('store'),
    observer
)(
    ({ doc }) => {
        const { firstName, lastName, userID } = doc.data
        return (
            <div>
                {`First:_${firstName}_____Last:_${lastName}_____UID:_${userID}`}
            </div>
        )
    }
)