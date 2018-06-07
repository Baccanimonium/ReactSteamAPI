import React from 'react';
import {ModalWrapper,BGModal} from "../components/UI/Modal"
import { CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types'

const Loader = ({show}) => {

    return (
        <CSSTransition
            classNames={{
                appear: 'fade-appear',
                appearActive: 'fade-appear-active',
                enter: 'fade-enter',
                enterActive: 'fade-enter-active',
                exit: 'fade-exit',
                exitActive: 'fade-exit-active'
            }}
            appear
            timeout={300}
            in={show}
            unmountOnExit
        >
            <ModalWrapper>
                <BGModal/>
            <div className="wrap-loader">
                <div className="loader">
                    <div className="box"></div>
                    <div className="box"></div>
                    <div className="box"></div>
                    <div className="box"></div>
                    <div className="wrap-text">
                        <div className="text"><span>L</span><span>O</span><span>A</span><span>D</span><span>I</span><span>N</span><span>G</span><span>...</span>
                        </div>
                    </div>
                </div>
                <div className="loader-text">wait please</div>
            </div>
            </ModalWrapper>
        </CSSTransition>
    )
}

export default Loader

Loader.propTypes = {
    show: PropTypes.bool
}