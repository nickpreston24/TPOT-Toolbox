import React, { Component } from 'react'
import { compose } from 'recompose'
import { inject, observer } from 'mobx-react';
import { Route, Switch } from 'react-router-dom'
import MaterialTable from 'material-table'
import { Box } from '@material-ui/core';
import EditMode from '../../Toolbox/views/EditMode';
import { toJS, observable } from 'mobx';

export const CheckoutPage = compose(
    inject('store'),
    observer
)(
    class CheckoutPage extends Component {

        render() {
            const { store } = this.props
            const { scribeStore } = store
            const { users } = scribeStore
            return (
                <Box width="80%">
                    <CheckoutTable {...{ users }} />
                </Box>
            )
        }
    }
)


export const CheckoutTable = compose(
    // inject('store'),
    observer
)(
    class CheckoutTable extends Component {
        @observable search = true

        render() {
            const { users } = this.props
            const data = users.docs.map((doc) => {
                const { firstName, lastName, userID } = doc.data
                return { name: firstName, status: lastName, edited: userID, uploaded: null }
            })
            return (
                <MaterialTable
                    title="Checkout"
                    columns={[
                        // { field: 'avatar', searchable: false, export: false, render: rowData => <img src={'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4'} style={{ width: 50, borderRadius: '50%' }} /> },
                        { title: 'Document', field: 'name', searchable: true },
                        { title: 'Status', field: 'status', searchable: false },
                        { title: 'Last Edited', field: 'edited', type: 'datetime', searchable: false },
                        { title: 'Uploaded', field: 'uploaded', type: 'datetime', searchable: false }
                    ]}
                    data={data}
                    // detailPanel={{
                    //     disabled: 
                    // }}
                    // detailPanel={rowData => {
                    //     return (
                    //         <iframe
                    //             width="100%"
                    //             height="315"
                    //             src="https://www.youtube.com/embed/C0DPdy98e4c"
                    //             frameborder="0"
                    //             allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    //             allowfullscreen
                    //         />
                    //     )
                    // }}

                    options={{
                        search: this.search,
                        selection: true,
                        draggable: true,
                        grouping: true,
                        exportButton: true,
                        exportAllData: true,
                        exportFileName: `TPOT Letters ${new Date().toDateString()}`,
                        columnsButton: false,
                        detailPanelColumnAlignment: 'right',
                        detailPanelType: 'single',
                        showSelectAllCheckbox: false,
                        showTextRowsSelected: false,
                    }}
                    // onSelectionChange={(rows) => {
                    //     this.search = rows ? !this.search : this.search;
                    //     return rows
                    // }}
                    localization={{
                        header: {
                            actions: 'imaaction'
                        },
                        toolbar: {
                            exportTitle: 'Export Table',
                            exportName: 'Save as CSV',
                            searchTooltip: 'Search by Document Name',
                            searchPlaceholder: 'Search'
                        }
                    }}
                    actions={[
                        {
                            icon: 'refresh',
                            tooltip: 'Refresh Table',
                            isFreeAction: true,
                            onClick: () => this.tableRef.current && this.tableRef.current.onQueryChange(),
                        },
                        {
                            tooltip: 'Upload .docx from your computer',
                            icon: 'backupOutlinedIcon',
                            isFreeAction: true,
                            onClick: (evt, data) => alert('You want to delete ' + data.length + ' rows')
                        }
                    ]}
                />
            )
        }
    }
)