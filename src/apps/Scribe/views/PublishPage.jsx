import { Button, Dialog, Grid, TextField, Typography, Card, Box, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Icon from 'mdi-material-ui/CloudUploadOutline';
import { inject, observer } from 'mobx-react';
import React, { Component, Fragment } from 'react'
import { compose } from 'recompose';


const styles = theme => ({
    root: {
        marginTop: 'calc((50vh - 250px))',
        marginBottom: 0,
        overflow: 'hidden',
    },
    backdrop: {
        // background: theme.palette.primary.main
    },
    paper: {
        marginTop: theme.spacing.unit * 6,
        marginBottom: theme.spacing.unit * 6,
        padding: theme.spacing.unit * 3,
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginLeft: 'auto',
        marginRight: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
    button: {
        marginLeft: theme.spacing.unit * 2,
    },
    urlDomain: {
        marginTop: theme.spacing.unit * 2,
        fontWeight: 400,
    },
    urlSlug: {
        color: theme.palette.primary.main,
    },
    icon: {
        marginTop: theme.spacing.unit * 3,
        fill: '#dedede',
        display: 'block',
        margin: 'auto',
        fontSize: 90,
    },
    red: {
        maxWidth: 700,
        color: 'blue !important',
    }
})


export const PublishPage = compose(
    inject('store'),
    withStyles(styles),
    observer
)(
    class PublishPage extends Component {
        state = {
            // Properties...
        }

        render() {
            let { store, classes, ...rest } = this.props
            const { lettersStore, editorStore } = store
            // let editorCode = editorStore.editorCode

            return (
                <Fragment>
                    <PublishScreen comments={lettersStore.publishData} store={lettersStore} classes={classes}
                        // editorCode={store.scribeStore.session.editorStore.editorCode} 
                        {...rest} />
                </Fragment>
            )
        }
    }
)

const PublishScreen = observer(({ classes, store, editorCode, container, ...rest }) => {
    console.log(container)
    return (
        // <Box borderColor="green" border={1}>
        <Box display="flex" maxWidth={700}>
            <Card>
                <Box p={4}>
                    <PublishForm classes={classes} store={store} editorCode={editorCode} />
                </Box>
            </Card>
        </Box>
        // </Box>
    )
})

const PublishForm = ({ classes, store, editorCode }) => (
    <Fragment>
        <Typography variant="h4" align="center">Publish</Typography>
        <Grid container spacing={16} alignItems="center">
            <PublishIcon classes={classes} />
            <TpotSlug classes={classes} store={store} />
            <InputField half="true" label="Title" onChange={e => { store.setPublishData('title', e.target.value) }} />
            <InputField half="true" label="Slug" onChange={e => { store.setPublishData('slug', e.target.value) }} />
            <InputField label="Excerpt (optional)" onChange={e => { store.setPublishData('excerpt', e.target.value) }} multiline rows={3} helperText="Enter a brief, meaningful description for search results." />
            <FormButtons classes={classes} store={store} editorCode={editorCode} />
        </Grid>
    </Fragment>
)

const TpotSlug = observer(({ classes, store }) => (
    <Grid item xs={12}>
        <Typography className={classes.urlDomain} variant="h6" align="center">
            {'www.thepathoftruth.com/letters/'}
            <span className={classes.urlSlug}>{store.publishData.slug}</span>
            {'.htm'}
        </Typography>
    </Grid>
))

const InputField = (props) => (
    props.half
        ? <Grid item xs={6}><TextField fullWidth variant="outlined" {...props} /></Grid>
        : <Grid item xs={12}><TextField fullWidth variant="outlined" {...props} /></Grid>
)

const FormButtons = ({ classes, store, editorCode }) => (
    <div className={classes.buttons}>
        <Button variant="contained" className={classes.button} >Preview</Button>
        <Button variant="contained" color="primary" onClick={() => store.publishToWordpress(editorCode)} className={classes.button} >Submit</Button>
    </div>
)

const PublishIcon = ({ classes }) => (
    <Grid item xs={12}><Icon className={classes.icon} /></Grid>
)