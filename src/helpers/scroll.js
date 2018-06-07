

//not completed, need for games layout
export const smoothScroll=(to, timeAnimation, updateCount)=>{
    const vars={
        animationTime:timeAnimation || 300,
        iterationCount: updateCount || 50,
        scrollTo: to || 0,
        from:window.pageYOffset,
        increment:'',
        refreshInterval:0,
        loopsCounter:0,
        nestPosition:0,
        counter:''
    }
    const getFinalIndex=()=>{
        vars.refreshInterval = Math.ceil(vars.animationTime/vars.iterationCount)
        vars.increment = (vars.from - vars.scrollTo)/vars.iterationCount
        console.log(vars.scrollTo,vars.from,vars.increment,vars.animationTime,vars.iterationCount,vars.refreshInterval,vars.loopsCounter)
        vars.counter =setInterval(nextIndex(), vars.refreshInterval)

    }
    const nextIndex=()=>{
        if (vars.loopsCounter < vars.iterationCount) {

            vars.loopsCounter++;
            console.log(vars.loopsCounter,vars.iterationCount,vars.loopsCounter < vars.iterationCount,vars.from -vars.increment)
            vars.nestPosition= vars.from -vars.increment
            return window.scrollTo(0,vars.nestPosition )
        }
        else {
            window.scrollTo(0, vars.scrollTo)
            clearCounter()
        }
    }
    const clearCounter=()=>{
        clearInterval(vars.counter)
    }
     getFinalIndex()
}


