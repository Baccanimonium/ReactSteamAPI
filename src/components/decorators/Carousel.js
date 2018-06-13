import React, {Component} from 'react'

export default (OriginalComponent) => class Carousel extends Component {

        state = {
            position: 0,
            slidingAnimationEnd: true,
            noTransition: false,
        }

// require slides length, passed by argument in originalComponent. slidesLength = number of components in original component
    nextSlide(slidesLength){
            //prevent over count click
        if (!this.state.slidingAnimationEnd){
            return
        }this.setState({
            slidingAnimationEnd: false
        })
        // if not the last slide

        if(this.state.position < (slidesLength )){
            this.setState((prevState) => {
                return {
                    position:prevState.position +1
                }
            })
        }
        // if the last slide
        if(this.state.position >= (slidesLength -1 )) {
            setTimeout(() => {this.setState({
                    noTransition: true,
                    position: 0
                })}, 1000)

        }
        //unlock button
        this.setState({
            slidingAnimationEnd: true,
            noTransition: false
        })
    }
    //require slides length, passed by argument in originalComponent. slidesLength = number of components in original component
    prevSlide(slidesLength){
        //prevent over count click
        if (!this.state.slidingAnimationEnd){
            return
        }
        this.setState((prevState) => {
            return {
                slidingAnimationEnd: false,
                position: prevState.position -1
            }
        })
        // if  the first slide
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
        //unlock button
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



