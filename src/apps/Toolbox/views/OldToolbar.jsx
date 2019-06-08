import { IconButton } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import PropTypes from "prop-types";
import React from "react";
import EditMode from "./EditMode";
import FileMenu from "./LettersFileMenu";


const styles = theme => ({
    root: {
        display: 'flex',
        flexGrow: 1,
        position: "relative",
        minHeight: 80,
    },
    flex: {
        flexGrow: 1,
        border: "1px solid blue"
    },
    contrastBar: {
        minHeight: 8,
        background: theme.palette.primary.dark
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    },
    authButton: {
        position: "absolute",
        right: 0,
        top: 0,
        border: "1px solid blue"
    }
});

class SimpleAppBar extends React.Component {
    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         fileMenuOpened: false,
    //         editMode: this.props.editMode // Set the initial state with value passed by parent
    //     };
    // }
    state = {
        anchorEl: null,
        fileMenuOpened: false,
        editMode: this.props.editMode // Set the initial state with value passed by parent
    };

    openFileMenu = event => {
        this.setState({
            anchorEl: event.currentTarget,
            fileMenuOpened: true
        })
    };

    updateFileMenu = (bool) => {
        this.setState({ fileMenuOpened: bool })
    };

    closeFileMenu = () => {
        this.setState({ fileMenuOpened: false })
    };

    // toggleMenu = () => {
    //     let fileMenuOpened = !this.state.fileMenuOpened; // toggle opposite of previous state
    //     this.setState({ fileMenuOpened: fileMenuOpened }); // update self
    //     this.props.onUpdate({
    //         fileMenuOpened: fileMenuOpened,
    //         editMode: this.state.editMode
    //     }); // update parent
    // };

    updateEditMode = mode => {
        this.setState({ editMode: mode }); // update self
        this.props.onUpdate({
            fileMenuOpened: this.state.fileMenuOpened,
            editMode: mode
        }); // update parent
    };

    render() {
        const { classes } = this.props;
        const childProps = { authUser: this.props.authUser }
        return (
            <div id="Header" className={classes.root}>
                <AppBar className={classes.root} position="static" color="primary" >
                    <Toolbar variant="dense" classes={{ root: classes.contrastBar, dense: classes.contrastBar }} />
                    <Toolbar variant="dense" >
                        <IconButton onClick={this.openFileMenu} className={classes.menuButton} color="inherit">
                            <MenuIcon />{" "}
                        </IconButton>
                        <EditMode currentTab={this.state.editMode} onUpdate={this.updateEditMode} editMode={this.state.editMode} />
                    </Toolbar>
                </AppBar>
                <FileMenu anchorEl={this.state.anchorEl} open={this.state.fileMenuOpened} onClose={this.closeFileMenu} onUpdate={this.updateFileMenu}/>
            </div>
        );
    }
}

SimpleAppBar.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleAppBar);
