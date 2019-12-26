import React, { Component } from 'react'
import { compose } from 'recompose'
import { inject, observer } from 'mobx-react';
import MaterialTable from 'material-table'
import { Box, Chip } from '@material-ui/core';
import { observable } from 'mobx';
import DescriptionIcon from '@material-ui/icons/Description';
import { Paper } from '../models/Paper';

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


/* Renders a single Paper */
const PaperDetails = observer(({ paper }) => {

    const { slug, excerpt, docx, date_modified, date_uploaded } = paper

    return (
        <>
            {date_uploaded && <p><b>Uploaded:</b> {date_uploaded}</p>}
            {date_modified && <p><b>Modified:</b> {date_modified}</p>}
            {docx && <p><b>Cloud Location:</b> {docx}</p>}
            {slug && <p><b>Slug:</b> {slug}</p>}
            {excerpt && <p><b>Excerpt:</b> {excerpt}</p>}
        </>
    )
})

/* Renders all available Papers */
export const CheckoutTable = compose(
    // inject('store'),
    observer
)(
    class CheckoutTable extends Component {
        @observable search = true

        render() {

            const { sessions } = this.props
            const papers = sessions.docs.map(document => ({ ...new Paper(document.data) }))

            return (
                <MaterialTable
                    title="Checkout"
                    columns={[
                        { field: 'Icon', searchable: false, export: false, render: () => <DocxIcon /> },
                        { title: 'Document', field: 'title', type: 'string', searchable: true },
                        { title: 'Status', field: 'status', type: 'string', searchable: false, render: paper => <StatusChip status={paper.status} /> },
                        { title: 'Last Edited', field: 'date_modified', type: 'string', searchable: false },
                        { title: 'Author', field: 'author', type: 'string', searchable: false },
                        { title: 'Uploaded', field: 'date_uploaded', type: 'string', searchable: false, hidden: true },
                        { title: 'Cloud Location', field: 'docx', type: 'string', searchable: false, hidden: true },
                        { title: 'Slug', field: 'slug', searchable: false, hidden: false },
                        { title: 'Excerpt', field: 'excerpt', searchable: false, hidden: true },
                    ]}
                    data={papers}
                    detailPanel={paper => <PaperDetails paper={paper} />}
                    options={{
                        search: this.search,
                        selection: false,
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
                    //     console.log('onSelectionChange() ', rows)
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

const DocxIcon = () =>
    <DescriptionIcon style={{ color: '#00008a' }} />

const statusMap = {
    'in-progress': 'In Progress',
    'not-started': 'Not Started',
    'checked-out': 'Checked Out',
    'published': 'Published',
}

const labelColors = {
    'in-progress': '#c3e3ff',
    'not-started': '#ffe8c6',
    'checked-out': '#ffc6c8',
    'published': '#c6ffc6',
}

const StatusChip = ({ status }) => {

    console.log('status chip: ', status);
    const label = statusMap[status]
    const color = labelColors[status]

    return (
        <Chip {...{ label }} style={{ background: color }} />
    )
}
