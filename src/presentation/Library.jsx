import React from 'react';
import VideoCard from './VideoCard'
import Box from './Box'
import { observer } from 'mobx-react';
import Background from '../media/wood.jpg'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
    zigzag: {
        '&': {
            display: "flex",
            flexFlow: 'column nowrap',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: "100%",
            background: theme.palette.background.default,
        },
        '&:before': {
            background: `linear-gradient(-45deg, transparent 16px, ${theme.palette.background.default} 0), linear-gradient(45deg, transparent 16px, ${theme.palette.background.default} 0)`,
            backgroundRepeat: 'repeat-x',
            backgroundPosition: 'left bottom',
            backgroundSize: '19.25px 28px',
            imageRendering: 'pixelated',
            content: '""',
            display: 'block',
            width: '100%',
            height: '19.25px',
            position: 'relative',
            transform: 'rotateX(-180deg)',
            filter: 'drop-shadow(0px 2px 1px rgba(0,0,0,.2))',
            top: -19,
        }
    },
})

export default function Library({ catalog }) {
    return (
        <PaperPanel
            svg={null}
        >
            <Box
                minHeight={500}
                maxHeight={500}
                width="100%"
                // bgcolor="primary.main"
                display="flex"
                flexDirection="column"
                justifyContent="flex-end"
                alignItems="stretch"
            >
                <img src={Background} width="100%" height="100%" alt="background"/>
            </Box>
            <PaperSlice>
                <VideoGallery {...{ catalog }} />
            </PaperSlice>
        </PaperPanel>
    );
}

export const PaperPanel = observer(({ children }) => (
    <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="stretch"
        flexWrap="no-wrap"
        minHeight="100vw"
        width="100%"
        style={{ overflowY: 'scroll' }}
    >
        {children}
    </Box>
))

export const PaperSlice = withStyles(styles)(observer(({ children, classes }) => (
    <div className={classes.zigzag} >
        <Box
            position="relative"
            top={-100}
            width={1280}
            padding={0}
            pl="32px"                
            pr="32px"   
            // border={1}
            style={{boxSizing: 'border-box'}}
        >
            {children}
        </Box>
    </div>
)))

export const VideoGallery = observer(({ catalog }) => (
    <Box
        // bgcolor="background.paper"
        borderRadius={12}
        // boxShadow={4}
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        style={{ overflowY: 'scroll' }}
    >
        {catalog && catalog.map((item, index) => (
            <Box
                key={index}
                width={{
                    sm: 1 / 1,
                    md: 1 / 2,
                    lg: 1 / 3,
                    xl: 1 / 3,
                }}>
                <VideoCard
                    title={item.title}
                    description={item.description}
                    id={item.id}
                />
            </Box>
        ))}
    </Box>
))