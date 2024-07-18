const home = document.getElementById('home')
const thumbnail = document.getElementById('thumbnail')
const title = document.getElementById('title')
const left = document.getElementById('left')
const playPause = document.getElementById('playPause')
const right = document.getElementById('right')
const progress = document.getElementById('progress')
const volume = document.getElementById('volume')
const volumeRange = document.getElementById('volumeRange')
const fistSec = document.getElementById('fistSec')
const secondSec = document.getElementById('secondSec')
const playIcon = document.getElementById('playIcon')
const cover = document.getElementById('cover')
const txt = document.getElementById('txt')
const song = document.getElementById('song')
const musicBanner = document.querySelectorAll('.musicBanner')
let _id = 0
let counter = 0
console.log(musicBanner);

console.log(musicData);

// onload placing the musicData

musicBanner.forEach((val, i) => {
    val.children[0].children[0].setAttribute('src', musicData[i].cover)
    val.children[0].children[2].children[0].innerHTML = musicData[i].artist
    val.children[0].children[2].children[1].innerHTML = musicData[i].songName
    

})

// *******************************************************************************************

// onload fixing the maximum of prograss


song.onloadedmetadata = function () {
    progress.max = song.duration;
    progress.value = song.currentTime
}


// *****************************************************************************************************************************

// click to open the secondSec

musicBanner.forEach((val, i) => {
    val.addEventListener('click', () => {
        secondSec.style.display = 'block'
        fistSec.style.display = 'none'

        cover.setAttribute('src', val.children[0].children[0].getAttribute('src'))
        txt.children[0].innerHTML = val.children[0].children[2].children[0].innerHTML
        txt.children[1].innerHTML = val.children[0].children[2].children[1].innerHTML

        thumbnail.setAttribute('src', val.children[0].children[0].getAttribute('src'))
        title.children[0].innerHTML = val.children[0].children[2].children[0].innerHTML
        title.children[1].innerHTML = val.children[0].children[2].children[1].innerHTML

        val.setAttribute('id' , musicData[i].Id)
        _id = val.getAttribute('id')
        console.log(val.getAttribute('id'));
        console.log(_id);
        


        song.setAttribute('src', musicData[i].song)

        counter = 0

        _playIcon()


    })
})

console.log(_id);

// *************************************************************************************************************************************


// home click to back to the main list and default state

home.addEventListener('click', () => {
    secondSec.style.display = 'none'
    fistSec.style.display = 'block'
})

// ***********************************************************************************************************


// play and pause

playIcon.addEventListener('click', () => {
    if (counter % 2 == 0) {
        _play()
        counter++
    } else {
        _pause()
        counter++
    }

})


playPause.addEventListener('click', () => {
    if (counter % 2 == 0) {
        _play()
        counter++
    } else {
        _pause()
        counter++
    }

})


progress.addEventListener('change' , ()=>{
    _play()
    song.currentTime = progress.value
    progress.max = song.duration;
    counter = 1
})


// *********************************************************************************************8


// volume settting 


volumeRange.addEventListener('change' , ()=>{
    song.volume = volumeRange.value / 100 
    if(song.volume == 0){
        volume.innerHTML = 'volume_off'
    }else{
        volume.innerHTML = 'volume_up'
    }
})


volume.addEventListener('click' , ()=>{
    if(song.volume == 0){
        volume.innerHTML = 'volume_up'
        volumeRange.value = 50
        song.volume = volumeRange.value / 100 
        
    }else{
        volume.innerHTML = 'volume_off'
        volumeRange.value = 0
        song.volume = volumeRange.value / 100
    }
})




// ********************************************************************************************


// left and right btn 
left.addEventListener('click' , ()=>{
    if(song.currentTime > 5){
        song.currentTime = 0
    }else{
        cover.setAttribute('src', musicData[(_id-2)].cover)
        txt.children[0].innerHTML = musicData[(_id-2)].artist
        txt.children[1].innerHTML = musicData[(_id-2)].songName

        thumbnail.setAttribute('src', musicData[(_id-2)].cover)
        title.children[0].innerHTML = musicData[(_id-2)].artist
        title.children[1].innerHTML = musicData[(_id-2)].songName

        song.setAttribute('src', musicData[(_id-2)].song)

        _id = musicData[(_id-2)].Id

        _play()

    }
})


right.addEventListener('click' , ()=>{
    cover.setAttribute('src', musicData[_id].cover)
        txt.children[0].innerHTML = musicData[_id].artist
        txt.children[1].innerHTML = musicData[_id].songName

        thumbnail.setAttribute('src', musicData[_id].cover)
        title.children[0].innerHTML = musicData[_id].artist
        title.children[1].innerHTML = musicData[_id].songName

        song.setAttribute('src', musicData[_id].song)

        _id = musicData[_id].Id

        
        _play()


})

// functions:


function _play() {
    song.play()
    _pauseIcon()

    setInterval(() => {
        progress.value = song.currentTime
    }, 500);
}


function _pauseIcon() {
    playIcon.innerHTML = 'pause_circle'
    playIcon.classList.add('rotate')

    playPause.innerHTML = 'pause_circle'
}


function _playIcon() {
    playIcon.innerHTML = 'play_circle'
    playIcon.classList.remove('rotate')
    playPause.innerHTML = 'play_circle'
}

function _pause() {
    song.pause()
    _playIcon()
}



