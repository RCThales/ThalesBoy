window.addEventListener('load', () => {

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

    //Changin the video game color on start
    changeColor(currentColor)

    //Avoiding the transition when the page is loaded or reloaded
    const gameBody = document.getElementById('gameBody') as HTMLButtonElement
    gameBody.style.transition = '0s ease all'

    const brand = document.getElementById('brand') as HTMLElement
    brand.style.transition = '0s ease all'

})


const changeColor = (color:string) => {
    const yellow = document.getElementById('yellow') as HTMLButtonElement
    const blue = document.getElementById('blue') as HTMLButtonElement
    const pink = document.getElementById('pink') as HTMLButtonElement
    const purple = document.getElementById('purple') as HTMLButtonElement
    const green = document.getElementById('green') as HTMLButtonElement

    //Adding the transition for the coloring effect
    const gameBody = document.getElementById('gameBody') as HTMLButtonElement
    gameBody.style.transition = '1s ease all'
     const brand = document.getElementById('brand') as HTMLElement
    brand.style.transition = '0.5s ease all'

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
    document.querySelector('.led')?.classList.toggle('on')
}
