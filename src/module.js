console.log('module.js')

function sleep(time = 1000) {
  return new Promise( (resolve) => {
    setTimeout( () => resolve( console.log('resolve()')), time)
  })
}

async function start() {
  await sleep(4000)
}

start()
