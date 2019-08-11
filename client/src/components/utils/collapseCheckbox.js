import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown';
import faAngleUp from '@fortawesome/fontawesome-free-solid/faAngleUp';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Collapse from '@material-ui/core/Collapse';


class CollapseCheckbox extends Component {

    state = {
        open: false,
        checked: []
    }

    //componentDidMount: to handle open n closed state of state.
    componentDidMount(){
        if(this.props.initState){
            this.setState({
                open: this.props.initState
            })
        }
    }

    handleClick = () => {
        this.setState({open: !this.state.open})
    }

    handleAngle = () => (
        this.state.open ?
            <FontAwesomeIcon
                icon={faAngleUp}
                className="icon"
            />
        : 
            <FontAwesomeIcon
                icon={faAngleDown}
                className="icon"
            />
    )

    renderList = () => (
        this.props.list ?
            this.props.list.map((value)=>(
                <ListItem key={value._id} style={{padding:'10px 0'}}>
                    <ListItemText primary={value.name}/>
                    <ListItemSecondaryAction>
                        <Checkbox
                            color="primary"
                            onChange={this.handleToggle(value._id)}
                            checked={this.state.checked.indexOf(value._id) !== -1}
                            //-1 because if the element is not in the array this is going to be false. 
                        />
                    </ListItemSecondaryAction>
                </ListItem>
            ))
        :null
    )


    handleToggle = value => () => {
        const { checked } = this.state;
        //above line is equal to : const checked = this.state.checked
        const currentIndex = checked.indexOf(value);
        //index is negative if we have same value as the same id in above toggle function.
        //index is positive if not same and indexOf gives the position of that array.
        const newChecked = [...checked];
        //newChecked is an array creating copy of current index so that donot mutate the original array.

        if(currentIndex === -1){
            newChecked.push(value)
        } else{
            newChecked.splice(currentIndex,1) 
            //1  because remove that index only, if 2 then remove that index +the next one.
        }
        //-1 means push it into the list. 
        //else if positive number then already in the list therefore splice or remove the index.
        this.setState({
            checked: newChecked
        },()=>{
            this.props.handleFilters(newChecked)
        })

    }

    render() {
        return (
            <div className="collapse_items_wrapper">
                <List style={{borderBottom: '1px solid #dbdbdb'}}>
                    <ListItem onClick={this.handleClick} style={{padding:'10px 23px 10px 0'}}>
                        <ListItemText
                            primary={this.props.title}
                            className="collapse_title"
                        />
                        {this.handleAngle()}
                    </ListItem>
                    <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {this.renderList()}
                        </List>
                    </Collapse>
                </List>
            </div>
        )
    }
}
export default CollapseCheckbox;