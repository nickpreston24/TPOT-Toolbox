import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';
import StyleButton from './StyleButton'

// Draft JS Icons
import BoldIcon from 'mdi-material-ui/FormatBold'
import ItalicIcon from 'mdi-material-ui/FormatItalic'
import UnderlineIcon from 'mdi-material-ui/FormatUnderline'
import TextColorIcon from 'mdi-material-ui/FormatColorFill'
import AlignLeftIcon from 'mdi-material-ui/FormatAlignLeft'
import AlignCenterIcon from 'mdi-material-ui/FormatAlignCenter'
import NumberIcon from 'mdi-material-ui/FormatListNumbers'
import BulletIcon from 'mdi-material-ui/FormatListBulleted'
import HeadingIcon from 'mdi-material-ui/FormatFontSizeIncrease'
import HorizontalRuleIcon from 'mdi-material-ui/FormatPageBreak'
import BlockQuoteIcon from 'mdi-material-ui/FormatQuoteOpen'
import MoreMenuIcon from 'mdi-material-ui/DotsHorizontal'
import IndentIcon from 'mdi-material-ui/FormatIndentIncrease'
import HighlightIcon from 'mdi-material-ui/Marker'
import EmojiIcon from 'mdi-material-ui/EmoticonExcited'

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        flexGrow: 1,
    },
    styleControls: {
        padding: "16px",
        background: "#f0f0f0",
        borderRadius: "16px",
        boxShadow: "inset 0px -4px 7px 0px rgba(0,0,0,0.08)"
        // maxWidth: '96px',
    }
});

class MuiToolbar extends React.Component {
    constructor() {
        super();
        this.onToggle = (e) => {
            e.preventDefault();
            this.props.onToggle(this.props.type, this.props.style);
        }
    }

    componentShouldUpdate = () => {
        return false
    }

    render() {
        const classes = this.props.classes
        const options = x => x.map(fontSize => {
            return <option key={fontSize} value={fontSize}>{fontSize}</option>;
        });
        //  FOR LATER (buttons know if they are active or not)
        // let className = 'RichEditor-styleButton';
        // if (this.props.active) {
        //         className += ' RichEditor-activeButton';
        // }
        return (
            <div id={'MuiToolbar'} className={classes.styleControls}>
                {BUTTONS.map((button) =>
                    <StyleButton
                        key={button.label}
                        // active={currentStyle.has(type.style)}
                        label={button.label}
                        onToggle={this.toggleStyle}
                        type={button.type}
                        style={button.style}
                        icon={button.icon}
                    />
                )}
                <button onClick={(e) => this.toggleColor()}>TOGGLE</button>
                <button onClick={this.props.getData}>DATA</button>
                <select onChange={e => this.toggleFontSize(e.target.value)}>
                    {options(['12px', '24px', '36px', '50px', '72px'])}
                </select>
                <select onChange={e => this.toggleColor(e.target.value)}>
                    {options(['green', 'blue', 'red', 'purple', 'orange', '#FF0099'])}
                </select>
            </div>
        )
    }
}

MuiToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MuiToolbar)

// TOOLBAR CONFIG DATA
///////////////////////////////////////

const BUTTONS = [
    { type: 'inline', label: 'Bold', style: 'BOLD', icon: <BoldIcon /> },
    { type: 'inline', label: 'Italic', style: 'ITALIC', icon: <ItalicIcon /> },
    { type: 'inline', label: 'Underline', style: 'UNDERLINE', icon: <UnderlineIcon /> },
    { type: 'block', label: 'Divider', style: 'blockquote', icon: <HorizontalRuleIcon /> },
    { type: 'inline', label: 'Left', style: 'BOLD', icon: <AlignLeftIcon /> },
    { type: 'block', label: 'Center', style: 'CENTER', icon: <AlignCenterIcon /> },
    { type: 'block', label: 'Number', style: 'ordered-list-item', icon: <NumberIcon /> },
    { type: 'block', label: 'Bullet', style: 'unordered-list-item', icon: <BulletIcon /> },
    { type: 'block', label: 'Heading', style: 'header-four', icon: <HeadingIcon /> },
    { type: 'inline', label: 'Color', style: 'COLOR', icon: <TextColorIcon /> },
    { type: 'block', label: 'Quote', style: 'blockquote', icon: <BlockQuoteIcon /> },
    { type: 'inline', label: 'More Options', style: null, icon: <MoreMenuIcon /> },
    { type: 'inline', label: 'Indent', style: 'INDENT', icon: <IndentIcon /> },
    { type: 'inline', label: 'Highlight', style: 'HIGHLIGHT', icon: <HighlightIcon /> },
    { type: 'inline', label: 'Emoji', style: 'EMOJI', icon: <EmojiIcon /> },
]