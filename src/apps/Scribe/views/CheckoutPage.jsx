import React, { Component } from 'react'
import { compose } from 'recompose'
import { inject, observer } from 'mobx-react';
import { Route, Switch } from 'react-router-dom'
import MaterialTable from 'material-table'
import { Box, Chip } from '@material-ui/core';
import EditMode from '../../Toolbox/views/EditMode';
import { toJS, observable } from 'mobx';
import DescriptionIcon from '@material-ui/icons/Description';
import moment from 'moment';

export const CheckoutPage = compose(
    inject('store'),
    observer
)(
    class CheckoutPage extends Component {

        render() {
            const { store } = this.props
            const { scribeStore } = store
            const { sessions } = scribeStore
            return (
                <Box width="80%">
                    <CheckoutTable {...{ sessions }} />
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
            const { sessions } = this.props
            const data = sessions.docs.map((doc) => {
                let { author, status, date_modified, date_uploaded, docx, title, slug, excerpt } = doc.data
                date_modified = date_modified.toDate()
                date_modified = moment.duration(moment(date_modified).diff(moment())).humanize(true)
                date_uploaded = date_uploaded.toDate()
                date_uploaded = moment.duration(moment(date_uploaded).diff(moment())).humanize(true)
                return { ...{ author, status, date_modified, date_uploaded, docx, title, slug, excerpt } }
            })
            return (
                <MaterialTable
                    title="Checkout"
                    columns={[
                        { field: 'Icon', searchable: false, export: false, render: () => <IconComp /> },
                        { title: 'Document', field: 'title', type: 'string', searchable: true },
                        { title: 'Status', field: 'status', type: 'string', searchable: false, render: data => <StatusComp {...{ data }} /> },
                        { title: 'Last Edited', field: 'date_modified', type: 'datetime', searchable: false },
                        { title: 'Author', field: 'author', type: 'string', searchable: false },
                        { field: 'date_uploaded', type: 'string', searchable: false, hidden: true },
                        { field: 'docx', type: 'string', searchable: false, hidden: true },
                        { field: 'slug', searchable: false, hidden: true },
                        { field: 'excerpt', searchable: false, hidden: true },
                    ]}
                    data={data}
                    detailPanel={rowData => {
                        const { date_uploaded, docx, slug, excerpt } = rowData
                        console.log("ROW", rowData)
                        return (
                            <>
                                {/* <p>{rowData.date_uploaded}</p> */}
                                <p>{rowData.date_uploaded}</p>
                                <p>{rowData.docx}</p>
                                {/* <p>{rowData.slug}</p> */}
                                {/* <p>{date_uploaded}</p>
                                <p>{docx}</p>
                                <p>{slug}</p>
                                <p>{excerpt}</p> */}
                            </>
                        )
                    }}

                    options={{
                        search: this.search,
                        // selection: true,
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

const IconComp = () =>
    <DescriptionIcon style={{ color: '#0000008a' }} />

const StatusComp = (row) => {
    const status = row.data.status
    const label = status == 'in-progress' ? 'In Progress' : status == 'not-started' ? 'Not Started' : status == 'checked-out' ? 'Checked Out' : status == 'published' ? 'Published' : ''
    const color = label == 'In Progress' ? '#c3e3ff' : label == 'Not Started' ? '#ffe8c6' : label == 'Checked Out' ? '#ffc6c8' : label == 'Published' ? '#c6ffc6' : 'inherit'
    return (
        <Chip {...{ label }} style={{ background: color }} />
    )
}