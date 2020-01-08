import React, { Component } from 'react'
import { compose } from 'recompose'
import { inject, observer } from 'mobx-react';
import MaterialTable from 'material-table'
import { Box, Chip } from '@material-ui/core';
import DescriptionIcon from '@material-ui/icons/Description';
import { PaperDetails } from '../models/Paper';
import { useContext } from 'react'
import { CloudStorage } from '../../../shared/contexts/CloudStorage'
import { observable } from 'mobx';

const CheckoutView = props => {

    const checkout = useContext(CloudStorage).checkout;
    console.log(checkout);

    // let file = await download('MasterSample.docx')

    const { store } = props
    const { scribeStore } = store
    const { sessions } = scribeStore

    return (
        <Box width="80%">
            <CheckoutTable {...{ sessions, checkout }} />
        </Box>
    )
}

export const CheckoutPage = compose(inject('store'), observer)(CheckoutView)

/* Renders a single Paper */
const PaperDetailsView = observer(({ paper }) => {

    const { slug, excerpt, docx, date_modified, date_uploaded } = paper
    console.log('paper details:,', paper)

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
        @observable currentDocument = null

        render() {

            const { sessions, checkout } = this.props
            const papers = sessions.docs.map(document => ({ ...new PaperDetails(document.data) }))

            return (
                <MaterialTable
                    title="Checkout"
                    columns={[
                        { field: 'Icon', searchable: false, export: false, render: () => <DocxIcon onClick={() => checkout(this.currentDocument)} /> },
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
                    detailPanel={paper => <PaperDetailsView paper={paper} />}
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
                    onRowSelected={(rowData) => {
                        console.log('row details;', rowData)
                    }}
                    onRowClick={(row) => {
                        // console.log('row details;', row) //I don't see a way here.
                    }}
                    onSelectionChange={(rows) => {
                        console.log('onSelectionChange() ', rows)
                        this.search = rows ? !this.search : this.search;
                        return rows
                    }}
                    // localization={{
                    // header: {
                    // actions: 'imaaction'
                    // },
                    // toolbar: {
                    //     exportTitle: 'Export Table',
                    //     exportName: 'Save as CSV',
                    //     searchTooltip: 'Search by Document Name',
                    //     searchPlaceholder: 'Search'
                    // }
                    // }}                    
                    actions={[
                        {
                            icon: 'refresh',
                            tooltip: 'Refresh Table',
                            isFreeAction: true,
                            onClick: () => this.tableRef.current && this.tableRef.current.onQueryChange(),
                        },
                        // FIXME: Fix the way Uploader is rendered and closed, first.
                        {
                            tooltip: 'Upload .docx from your computer',
                            icon: 'backupOutlinedIcon',
                            isFreeAction: true,
                            onClick: () => { }
                        }
                    ]}
                />
            )
        }
    }
)

const DocxIcon = ({ onClick }) =>
    <DescriptionIcon onClick={onClick}
        style={{ color: '#00008a' }} />


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

    const label = statusMap[status]
    const color = labelColors[status]

    return (
        <Chip {...{ label }} style={{ background: color }} />
    )
}
