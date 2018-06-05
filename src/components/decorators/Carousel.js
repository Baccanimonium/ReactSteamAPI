import React, {Component} from 'react'

export default (OriginalComponent) => class Carousel extends Component {

        state = {
            position: 0,
            slidingAnimationEnd: true,
            noTransition: false,
        }


    nextSlide(slidesLength){
        if (!this.state.slidingAnimationEnd){
            return
        }this.setState({
            slidingAnimationEnd: false
        })

        if(this.state.position < (slidesLength )){
            this.setState((prevState) => {
                return {
                    position:prevState.position +1
                }
            })
        }
        if(this.state.position >= (slidesLength -1 )) {
            setTimeout(() => {this.setState({
                    noTransition: true,
                    position: 0
                })}, 1000)

        }
        this.setState({
            slidingAnimationEnd: true,
            noTransition: false
        })
    }
    prevSlide(slidesLength){
        if (!this.state.slidingAnimationEnd){
            return
        }
        this.setState((prevState) => {
            return {
                slidingAnimationEnd: false,
                position: prevState.position -1
            }
        })
        if (this.state.position <= 0){
            this.setState({
                noTransition: true,
                position: slidesLength
            })
            setTimeout(() => {
                this.setState({
                    noTransition: false,
                    slidingAnimationEnd: true,
                    position: slidesLength -1
                })
            }, 50)
        }
        this.setState({
            slidingAnimationEnd: true,
        })

    }
    render() {

        return <OriginalComponent{...this.props}
                                 {...this.state}
                                 prevSlide={(e) =>this.prevSlide(e)}
                                 nextSlide={(e) =>this.nextSlide(e)}

        />
    }
}



