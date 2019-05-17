import { AppBar, Checkbox, Chip, IconButton, Toolbar, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ArrowIcon from '@material-ui/icons/ArrowBack';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { observer } from 'mobx-react';
import { toJS } from 'mobx'
import React from 'react';
import Box from './Box';
import VideoCard from './VideoCard';
import VideoPlayer from './VideoPlayer';

const styles = theme => ({
    blurred: {
        // position: 'relative',
        // top: 0,
        // paddingTop: 80,
        // zIndex: -1,
        height: 'calc(100vh - 56px)',
        width: '100%',
        // height: 400,
        // width: 400,
        // backgroundImage: 'url("https://tinyurl.com/y3993bb3")',
        backgroundImage: "background-image: url('data:image/svg+xml;utf8,%3Csvg preserveAspectRatio='none' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='g'%3E%3Cstop offset='0' stop-color='%23fff' stop-opacity='0'%3E%3C/stop%3E%3Cstop offset='1' stop-color='%23fff' stop-opacity='1'%3E%3C/stop%3E%3C/linearGradient%3E%3Cmask id='m'%3E%3Crect x='0' y='0' width='1' height='1' fill='url(%23g)'%3E%3C/rect%3E%3C/mask%3E%3ClinearGradient id='a' gradientTransform='rotate(90)'%3E%3Cstop offset='0' stop-color='%234e332a'%3E%3C/stop%3E%3Cstop offset='1' stop-color='%23211511'%3E%3C/stop%3E%3C/linearGradient%3E%3ClinearGradient id='b' gradientTransform='rotate(90)'%3E%3Cstop offset='0' stop-color='%234e332a'%3E%3C/stop%3E%3Cstop offset='1' stop-color='%23433932'%3E%3C/stop%3E%3C/linearGradient%3E%3C/defs%3E%3Crect x='0' y='0' width='1' height='1' fill='url(%23a)' mask='url(%23m)'%3E%3C/rect%3E%3Crect x='0' y='0' width='1' height='1' fill='url(%23b)' mask='url(%23m)' transform='translate(1,1) rotate(180)'%3E%3C/rect%3E%3C/svg%3E ')",
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        // border: '2px solid red !important'
        // filter: 'blur(30px)',
        // overflow: 'hidden',
        // transform: 'scale(1.2)'
    },
    detailsPanel: {
        background: 'linear-gradient(163deg, #dcba9b 0%, #1f100d 100%)',
        boxShadow: '51px 85px 200px inset #3a312e',
        color: '#f3eeea'
    },
    chipContainer: {
        '& > div:first-child': {
            marginRight: theme.spacing.unit,
        }
    },
    chip: {
        color: '#6e542b !important',
        background: '#f6c964 !important',
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },
    fab: {
        background: 'transparent !important',
        border: '2px solid white !important',
        boxShadow: 'none !important'
    },
    star: {
        padding: `4px !important`,
        // margin: `0px !important`,
        // theme.spacing.unit
        color: '#f6c964 !important',
    },
})

const chips = [
    {
        name: 'eggs'
    },
    {
        name: 'poultry'
    }
]

const moreVideos = new Array(5)
moreVideos.fill('')

const VideoPage = withStyles(styles)(({ catalog, match, siblings, lastNav, classes, history }) => {
    const { id, category } = !!match && match.params
    const entry = toJS(catalog).filter(obj => obj.id === id)[0]
    console.log(entry)
    return (
        <Box display="flex" flexDirection="row" height="100vh" >
            <Box display="flex" flexDirection="column" flexGrow={1} >
                <Box flexGrow={1} style={{ overflow: 'hidden' }}>
                    <VideoPlayer {...{ id }} />
                </Box>
                <Box height={270} bgcolor="#1f2021" style={{ overflow: 'hidden' }} >
                    {Array(5).fill('').map((item, index) => (
                        <VideoCard {...{
                            key: Math.random(),
                            id: 'fLjslMtjkhs',
                            title: 'Harvest Haven Pastured Poultry – Free Range Living',
                            description: 'Harvest Haven laying hens, broilers, and turkeys are truly pasture raised and free range.  Our birds are in the pasture during the growing season where they get to scratch, hunt for bugs, and eat all the greens they want.'
                        }} />
                    ))}
                </Box>
            </Box>
            <Box minWidth={482} maxWidth={482} style={{ overflowY: 'scroll', textDecoration: 'unset !important' }}>
                {/* <Link to={`/library/eggs`} > */}
                <AppBar style={{ background: '#2196f3' }} position="sticky" onClick={e => history.push(`/library/${category}`)}>
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                            <ArrowIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" >
                            Back to Library
                            </Typography>
                    </Toolbar>
                </AppBar>
                {/* </Link> */}
                <VideoDetails {...{ entry }} />
            </Box>
        </Box>
    )
})

export default VideoPage

export const VideoDetails = withStyles(styles)(observer(({ entry, classes }) => (
    <Box position="relative" height="100%" p={[3]} style={{ overflowX: 'hidden', overflowY: 'scroll', }} className={classes.detailsPanel} display="flex" flexDirection="column" alignItems="stretch" >
        {/* title */}
        <Box><Typography variant="h4" color="inherit" gutterBottom >{entry.title}</Typography></Box>
        <Box display="flex" flexDirection="row">
            <Box flexGrow={1} className={classes.chipContainer} marginTop={[1]} marginBottom={[2]}>
                {chips.map((chip, index) => (
                    <Chip
                        key={Math.random()}
                        color="primary"
                        label={chip.name}
                        classes={{
                            root: classes.chip,
                            colorPrimary: classes.colorPrimary
                        }}
                    />))}
            </Box>
            <Box display="flex" alignItems="center" justifyContent="flex-end" flexDirection="row">
                {['S', 'T', 'A', 'R', ''].map((chip, index) => (
                    <Box key={index}><Checkbox disableRipple icon={<StarBorderIcon />} checkedIcon={<StarIcon />} checked={!!chip} classes={{
                        root: classes.star,
                    }} /></Box>
                ))}
            </Box>
        </Box>
        <Box>
            {entry.description.split(/\r?\n/).map(paragraph => (
                <Typography variant="subtitle1" color="inherit" paragraph style={{ fontSize: 18, letterSpacing: 1, filter: 'drop-shadow(rgb(0, 0, 0, 0.5) 0px 1px 1px)'}}>{paragraph}</Typography>
            ))}
        </Box>
    </Box>
)))



// export const ChipsAndActions = withStyles(chipStyles)(observer(({ id, title, description, classes }) => (
//     // <Box minWidth={300} display="flex" flexDirection="column" alignItems="stretch">
//     <>
//         <Box border={2}><Typography variant="h6" color="inherit" paragraph >Tags:</Typography></Box>
//         <Box border={2}>
//             {chips.map(chip => (
//                 <Chip
//                     label="Primary Clickable Chip"
//                     color="primary"
//                     label={chip.name}
//                     classes={{
//                         root: classes.root,
//                         colorPrimary: classes.colorPrimary
//                     }}
//                 />))}
//         </Box>
//         <Box border={2}>Test</Box>
//     </>
//     // <Typography variant="h6" color="inherit" paragraph >Tags:</Typography>
//     // {chips.map(chip => (
//     //     <Chip
//     //         label="Primary Clickable Chip"
//     //         color="primary"
//     //         label={chip.name}
//     //         classes={{
//     //             root: classes.root,
//     //             colorPrimary: classes.colorPrimary
//     //         }}
//     //     />
//     // ))}
//     // <Fab size="medium" color="secondary" classes={{ root: classes.fab }} ><SaveIcon /></Fab>
//     // <Fab size="medium" color="secondary" classes={{ root: classes.fab }} ><DoneIcon /></Fab>
//     // <Fab size="medium" color="secondary" classes={{ root: classes.fab }} ><ShareIcon /></Fab> 
// )))




