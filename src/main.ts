let audio = new Audio('../audio/thalesboyOn.mp3');
let introOff:any = () => {}
const gameIFrame = document.querySelector('.screen') as HTMLIFrameElement

onselectstart = (e) => {
  e.preventDefault()
}

window.addEventListener('load', () => {

    loadSplashScreen()

    //Setting Color mode on startup
    if(localStorage.getItem('theme') === null){
        localStorage.setItem('theme', 'day')
    }

    setColorOnStartUp()
    setThemeOnStartup() 

})


const loadSplashScreen = () => {
      //Splash gameIFrame
    const splash = document.getElementById('splash') as HTMLElement
    setTimeout(function(){splash.style.display = 'none'}, 1500)
}

/* CONTROLLERS */
const move = (button:string) => {
    gameIFrame.contentDocument?.dispatchEvent(new KeyboardEvent('keydown', {'key': button}));
    console.log(gameIFrame.contentWindow);
}



const setThemeOnStartup = () => {
    const container = document.querySelector('.container') as HTMLElement
    const button = document.querySelector('.themeBtn') as HTMLButtonElement
    const theme = localStorage.getItem('theme')
    

    //Night Mode
    if(theme === 'day'){
        button.textContent = '🌚'
        container.style.background = 'var(--secondary)'
        localStorage.setItem('theme', 'day')
        return
    }

    //Day Mode
    button.textContent = '🌞'
    localStorage.setItem('theme', 'night')
    container.style.background = 'var(--darkAccent)'

}

const selectTheme = () => {
    const container = document.querySelector('.container') as HTMLElement
    const button = document.querySelector('.themeBtn') as HTMLButtonElement
    const theme = localStorage.getItem('theme')
    

    //Night Mode
    if(theme === 'night'){
        button.textContent = '🌚'
        container.style.background = 'var(--secondary)'
        localStorage.setItem('theme', 'day')
        return
    }

    //Day Mode
    button.textContent = '🌞'
    localStorage.setItem('theme', 'night')
    container.style.background = 'var(--darkAccent)'

}

const setColorOnStartUp = () => {
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

const gamePowerOnAndOff = () => {

    //turnLedOnOrOff() returns true if game is on and false if it is off.
    //ANCHOR GAME ON
    if(turnLedOnOrOff()){
        
        movePowerButton(true)
        playGif(true)
        redirectScreenToGameWebPage(true)
        toggleAnimatedHelperText(true)
        playGameAudioAnimation(true)
        gameIFrame?.contentWindow?.focus()
        return
    }

    //ANCHOR GAME OFF
    movePowerButton(false)
    playGif(false)
    redirectScreenToGameWebPage(false)
    toggleAnimatedHelperText(false)
     playGameAudioAnimation(false)
}

const playGameAudioAnimation = (on:boolean) => {
    const audioAnimation = document.querySelectorAll('.musicalNotes')
    if(on){    
        audioAnimation.forEach(element => {
            element.classList.remove('soundOff');
        });
        return
    }

    audioAnimation.forEach(element => {
            element.classList.add('soundOff');
    });
}
const movePowerButton = (on:boolean) => {
    const audio = new Audio('../audio/toggleSound.mp3')
    const btn = document.getElementById('powerBtn') as HTMLElement
    const btnMobile = document.getElementById('powerBtnMobile') as HTMLElement
    if(on){
       //Button movement
        audio.play()  
        btn.style.transform = 'translateY(-15px)'
        btnMobile.style.transform = 'translateX(130px)'
        btnMobile.style.color = 'red'
        btn.style.pointerEvents = 'none'
        btnMobile.style.pointerEvents = 'none'
      

        setTimeout(() => {
            btn.style.pointerEvents = 'auto'
            btnMobile.style.pointerEvents = 'auto'
        },4100)
        return
    }

    audio.play()
    btn.style.transform = 'translateY(0px)'
    btnMobile.style.transform = 'translateX(0px)'
    btnMobile.style.color = 'var(--darkAccent)'

}

const playGif = (on:boolean) => {
    const screenIntro = document.querySelector('.screenIntro') as HTMLElement
    screenIntro.style.display = 'block'
    const gif = document.createElement('img')

    if(on){
        //Intro Audio Effect
        audio.play()

        //Creating gif every time the game is on so the gif can play once from the start
        gif.src = '../img/thalesboygif.gif'
        gif.className = 'gameIntro'
        screenIntro.append(gif)
        
        //End of the animation
        introOff = setTimeout(() => {
        gif.remove()
        screenIntro.style.display = 'none'
        }, 4000)
        return
    }

    window.clearTimeout(introOff)
    screenIntro.style.display = 'none'
    audio.pause()
    audio.currentTime = 0
}

const redirectScreenToGameWebPage = (on:boolean) => {

    if(on){
  
        //Opening game system link by shutting gameIFrame on
        setTimeout(() => {
            gameIFrame.src = '../menu.html'        
        }, 3500)
       
        return
    }

    //Shutting gameIFrame off
    gameIFrame.src = ''

}

const turnLedOnOrOff = () => {

    const led = document.querySelector('.led')
    led?.classList.toggle('on')
    
    if(led?.classList.contains('on')) return true
    return false
}

const toggleAnimatedHelperText = (on:boolean) => {
    let toggle = document.querySelectorAll('#powerText > *')

   if(on){
        //Animated text instruction for the power button disappear
        toggle.forEach((e:any) =>{
                    e.style.display = 'none' 
        })
        return
    }

    //Animated text instruction for the power button appear
    toggle.forEach((e:any) =>{
        e.style.display = 'block' 
    })
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



