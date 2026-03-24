function showAnswers(exampleID) {
        const currentHTML = document.getElementsByTagName('html')
        const currentLang = currentHTML[0].lang
        let seeAnswerStr, hideAnswerStr
        if (currentLang === 'es') {
            seeAnswerStr = 'Ver la respuesta'
            hideAnswerStr = 'Esconder la respuesta'
        } else {
            seeAnswerStr = 'See answer'
            hideAnswerStr = 'Hide answer'
        }
    const examples = document.getElementsByClassName('ejercicio')
    const clickedBtn = examples[exampleID].getElementsByClassName('see-answer-btn')
    if (clickedBtn[0].innerHTML === seeAnswerStr) {
        //In example with exampleID, hide elements with class 'open-for-answers'
        const elemsToHide = examples[exampleID].getElementsByClassName('open-for-answers')
        for(let i = 0; i < elemsToHide.length; i++) {
            elemsToHide[i].classList.add('hidden')
        }
        //and show elements with with class 'full-of-answers'
        const elemsToShow = examples[exampleID].getElementsByClassName('full-of-answers')
        for(let i = 0; i < elemsToShow.length; i++) {
            elemsToShow[i].classList.remove('hidden')
        }
        clickedBtn[0].innerHTML = hideAnswerStr
    } else {
        //In example with exampleID, show elements with class 'open-for-answers'
        const elemsToHide = examples[exampleID].getElementsByClassName('open-for-answers')
        for(let i = 0; i < elemsToHide.length; i++) {
            elemsToHide[i].classList.remove('hidden')
        }
        //and hide elements with with class 'full-of-answers'
        const elemsToShow = examples[exampleID].getElementsByClassName('full-of-answers')
        for(let i = 0; i < elemsToShow.length; i++) {
            elemsToShow[i].classList.add('hidden')
        }
        clickedBtn[0].innerHTML = seeAnswerStr

        //Scroll to the top of the example (in case the answers are long enough to scroll)
        examples[exampleID].scrollIntoView({ behavior: 'smooth' })
    }
}