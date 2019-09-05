import { Button, Dialog, Grid, TextField, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Icon from 'mdi-material-ui/CloudUploadOutline';
import { observer } from 'mobx-react';
import React, { Fragment } from 'react';
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
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
        padding: theme.spacing(3),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginLeft: 'auto',
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    button: {
        marginLeft: theme.spacing(2),
    },
    urlDomain: {
        marginTop: theme.spacing(2),
        fontWeight: 400,
    },
    urlSlug: {
        color: theme.palette.primary.main,
    },
    icon: {
        marginTop: theme.spacing(3),
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

// Main Class
const PublishScreen = observer(({ classes, store, editorCode, container, ...rest }) => {
    console.log(container)
    return (
        <main id="PublishScreen">
            <Dialog open={true} 
            container={container}
            // disablePortal
            closeAfterTransition
            onBackdropClick={e => {
                const { history, match } = rest
                if (!!history.push) {
                    history.push(match.url)
                }
            }} scroll={'body'} classes={{ root: classes.root, container: classes.backdrop, paper: classes.paper }} >
                <PublishForm classes={classes} store={store} editorCode={editorCode} />
            </Dialog>
        </main>
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
        <Button variant="contained" onClick={this.handleNext} className={classes.button} >Preview</Button>
        <Button variant="contained" color="primary" onClick={() => store.publishToWordpress(editorCode)} className={classes.button} >Submit</Button>
    </div>
)

const PublishIcon = ({ classes }) => (
    <Grid item xs={12}><Icon className={classes.icon} /></Grid>
)

// Main Export
export default compose(
    // inject('editorStore'),
    withStyles(styles),
    observer
)(PublishScreen)