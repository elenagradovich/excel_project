console.log('module.js')

function sleep (time = 1000) {
    return new Promise( resolve => {
        setTimeout( () => {
            console.log('resolve')
            resolve( console.log('resolve()'))
        }, time)
    })
}


async function start() {
    console.log('first')
    sleep(4000)
    console.log('second')
}

start()