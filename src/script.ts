
const gameOnAndOff = () => {

    const light:HTMLElement|null = document.getElementById('led')
    const screen: HTMLElement | null = document.getElementById('screen')

    if(light !== null && screen !== null){
        //If videogame is on
        if (light.classList.contains('on')) {
            screen.style.backgroundColor = 'rgb(105, 116, 99)';
            light.style.backgroundColor = 'rgb(34, 34, 34)'
            light.classList.remove('on')
        }
        //If videogame is off
        else {
            screen.style.backgroundColor = 'rgb(208, 228, 197)';
            light.style.backgroundColor = 'red'
            light.classList.add('on')
        } 
    }
}