import React, {Component} from 'react'
import { Route, Switch, Redirect} from 'react-router-dom'
import UserSection from './UserSection/User/Index'
import GamesSection from './UserSection/Games/index'
import { CSSTransition } from 'react-transition-group'
import { withRouter } from 'react-router'

class AppRoutes extends Component {

    render(){
        return(
            <div>
                {/*animate transition between routes does not apply on children route*/}
                <CSSTransition
                    classNames="fade"
                    timeout={500}
                    in={true}
                    mountOnEnter
                    key={this.props.location.pathname.split('/')[1]}
                    appear
                    exit={false}
                    unmountOnExit
                >
                    {/*add wrapper div to prevent bugs with react transition*/}
                    <div className="WRAPPER">
                        <Switch>
                            <Route path = "/:userId/own-games/:page" component = {GamesSection} />
                            <Redirect from={`/:userId/own-games/`} to={`/${localStorage.getItem(`userID`)}/own-games/1`}/>
                            <Route path = "/" component = {UserSection} />
                        </Switch>
                    </div>
                </CSSTransition>
            </div>
        )
    }
}
export default withRouter(AppRoutes)
