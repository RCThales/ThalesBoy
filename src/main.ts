let audio = new Audio('../audio/thalesboyOn.mp3');

onselectstart = (e) => {
  e.preventDefault()
}

window.addEventListener('load', () => {

    //Splash Screen
    const splash = document.getElementById('splash') as HTMLElement
    setTimeout(function(){splash.style.display = 'none'}, 1900)

    //Setting Color mode on startup
    if(localStorage.getItem('colorMode') === null){
        localStorage.setItem('colorMode', 'day')
    }
    colorModeStartup() 

    //Colors
    const yellow = document.getElementById('yellow') as HTMLButtonElement
    const blue = document.getElementById('blue') as HTMLButtonElement
    const pink = document.getElementById('pink') as HTMLButtonElement
    const purple = document.getElementById('purple') as HTMLButtonElement
    const green = document.getElementById('green') as HTMLButtonElement

    if(localStorage.getItem('gameColor') === null){
        localStorage.setItem('gameColor', 'yellow')
        yellow.style.display = 'none';
        return
    }

    const colors = {
        yellow: yellow,
        blue: blue,
        pink: pink,
        purple: purple,
        green: green
    }

    const currentColor = localStorage.getItem('gameColor') as string

    //Hiding the selected color button
    colors[currentColor as keyof typeof colors].style.display = 'none';

    //Changing the video game color on start
    changeColor(currentColor)

    //Avoiding the transition when the page is loaded or reloaded
    const gameBody = document.getElementById('gameBody') as HTMLButtonElement
    gameBody.style.transition = 'background 0s'

    const brand = document.getElementById('brand') as HTMLElement
    brand.style.transition = 'background 0s'

})

const colorModeStartup = () => {
    const container = document.querySelector('.container') as HTMLElement
    const button = document.querySelector('.nightMode') as HTMLButtonElement
    const colorMode = localStorage.getItem('colorMode')
    

    //Night Mode
    if(colorMode === 'day'){
        button.textContent = '🌚'
        container.style.background = 'var(--secondary)'
        localStorage.setItem('colorMode', 'day')
        return
    }

    //Day Mode
    button.textContent = '🌞'
    localStorage.setItem('colorMode', 'night')
    container.style.background = 'var(--darkAccent)'

}

const colorMode = () => {
    const container = document.querySelector('.container') as HTMLElement
    const button = document.querySelector('.nightMode') as HTMLButtonElement
    const colorMode = localStorage.getItem('colorMode')
    

    //Night Mode
    if(colorMode === 'night'){
        button.textContent = '🌚'
        container.style.background = 'var(--secondary)'
        localStorage.setItem('colorMode', 'day')
        return
    }

    //Day Mode
    button.textContent = '🌞'
    localStorage.setItem('colorMode', 'night')
    container.style.background = 'var(--darkAccent)'

}

const changeColor = (color:string) => {
    const yellow = document.getElementById('yellow') as HTMLButtonElement
    const blue = document.getElementById('blue') as HTMLButtonElement
    const pink = document.getElementById('pink') as HTMLButtonElement
    const purple = document.getElementById('purple') as HTMLButtonElement
    const green = document.getElementById('green') as HTMLButtonElement

    //Adding the transition for the coloring effect
    const gameBody = document.getElementById('gameBody') as HTMLButtonElement
    gameBody.style.transition = 'background 1s ease'
     const brand = document.getElementById('brand') as HTMLElement
    brand.style.transition = 'background 0.5s ease'

    const colors = {
        yellow: {id: yellow, primary: '#f8b725', accent: '#fcbe2b', carving: '#e1b245'},
        blue: {id: blue, primary: '#008199', accent: '#0089A1', carving: '#00687A'},
        pink: {id: pink, primary: '#e74254', accent: '#F7485C', carving: '#B83544'},
        purple: {id: purple, primary: '#6d2fdc', accent: '#6A24E3', carving: '#5A26B5'},
        green: {id: green, primary: '#79be01', accent: '#80C902', carving: '#619902'}
    }

    //Managing buttons
    let currentColor = localStorage.getItem('gameColor')
    let currentColorButton = colors[currentColor as keyof typeof colors]

    currentColorButton.id.style.display = 'flex'

    //Managin game coloring
    const colorObj = colors[color as keyof typeof colors]
    document.documentElement.style.setProperty('--primary', colorObj.primary);
    document.documentElement.style.setProperty('--accent', colorObj.accent);
    document.documentElement.style.setProperty('--carving', colorObj.carving);

    //Saving selected color to LocalStorage
    localStorage.setItem('gameColor', color)

    currentColor = localStorage.getItem('gameColor')
    currentColorButton = colors[currentColor as keyof typeof colors]

    //Animation trigger
    currentColorButton.id.style.display = 'none'

}

const gamePower = () => {
    const container = document.querySelector('.container') as HTMLElement
    const screen = document.querySelector('.screen') as HTMLIFrameElement
    const led = document.querySelector('.led')
    led?.classList.toggle('on')
    const btn = document.getElementById('powerBtn') as HTMLElement
    const btnMobile = document.getElementById('powerBtnMobile') as HTMLElement

    const gif = document.createElement('img')
    let toggle = document.querySelectorAll('#powerText > *')

    //Check if game is on or off
    const isOn = led?.classList.contains('on') ? true : false

    if(isOn){
        //Button movement
        btn.style.transform = 'translateY(15px)'
        btnMobile.style.transform = 'translateX(130px)'
        btnMobile.style.color = 'red'

        toggle.forEach((e:any) =>{
                 e.style.display = 'none' 
        })

        screen.src = 'https://tgs1.netlify.app/'
        audio.play()

        gif.src = '../img/thalesboygif.gif'
        gif.className = 'gameIntro'

        container.append(gif)
        
        setTimeout(() => {
          gif.remove()
        }, 5000)

        return
    }
    
      toggle.forEach((e:any) =>{
                 e.style.display = 'block' 
        })

    btn.style.transform = 'translateY(0px)'
    btnMobile.style.transform = 'translateX(0px)'
    btnMobile.style.color = 'var(--darkAccent)'

    audio.pause()
    audio.currentTime = 0
    screen.src = ''
    
}

//Swipe color change function
let touchstartX = 0
let touchendX = 0
let fingerCount = 0
    
const checkDirection = () => {

  const currentColor = localStorage.getItem('gameColor') as string

  const colors = ['yellow',
    'blue',
    'pink',
    'purple',
    'green']

  const index = colors.indexOf(currentColor)

  const distance = 50
  //left
  if (touchendX < touchstartX && (touchstartX - touchendX) > distance ){

    if(index === 4){
         changeColor(colors[0])
         return
    }

    changeColor(colors[index+1])
   
  } 
  //right
  if (touchendX > touchstartX && (touchendX - touchstartX) > distance){
    if(index === 0){
         changeColor(colors[4])
         return
    }

    changeColor(colors[index-1])
  } 
}

const gameBody = document.querySelector('.gameBody') as HTMLElement
gameBody.addEventListener('touchstart', e => {

    fingerCount = e.touches.length
    touchstartX = e.changedTouches[0].clientX  
     
})

gameBody.addEventListener('touchend', e => {

    touchendX = e.changedTouches[0].clientX
    if(fingerCount === 1){
     
        checkDirection() 
    }

})