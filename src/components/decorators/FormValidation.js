import React, {Component} from 'react'

export default (OriginalComponent) => class FormValidation extends Component {
    constructor(props){
        super(props)
        this.handleUserInput = this.handleUserInput.bind(this);
        this.state = {
            userID:''
        }
    }

    handleUserInput (type, e){
        const {value} = e.target
        this.setState({
                [type]: value
            }
        )
    }
    render() {
        return <OriginalComponent{...this.props}
                                 {...this.state}
                                 handleUserInput={this.handleUserInput}
        />
    }
}



