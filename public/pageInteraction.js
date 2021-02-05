const lists = document.querySelectorAll('ul');
const introDiv = document.getElementById('intro');
const searchResultsDiv = document.getElementById('search-results');
const textInput = document.getElementById('text-input');
const dataList = document.querySelector('datalist');
const options = document.querySelectorAll('option');
const backButton = document.querySelector('button');
let rAF;

const scrollListElements = () => {
    lists.forEach((element, index) => {
        if(index % 2 === 0) {
            element.scrollBy(-1, 0);
        } else {
            element.scrollBy(1, 0);
        }
    });
    rAF = requestAnimationFrame(scrollListElements);
}

const showResults = (searchedKeywordOption) => {
    introDiv.classList.add('fadedivout');
    document.getElementById('search-term').textContent = searchedKeywordOption.value;
    document.querySelector('iframe').src = searchedKeywordOption.getAttribute('data-url');
    requestAnimationFrame(scrollListElements);
    setTimeout(() => {
        introDiv.classList.replace('fadedivout', 'hide');
    }, 500);
    setTimeout(() => {
        searchResultsDiv.classList.replace('hide', 'fadedivin');
    }, 3000);
    setTimeout(() => {
        searchResultsDiv.classList.remove('fadedivin');
        cancelAnimationFrame(rAF);
    }, 4500);
}

const hideResults = () => {
    searchResultsDiv.classList.add('fadedivout');
    requestAnimationFrame(scrollListElements);
    setTimeout(() => {
        searchResultsDiv.classList.replace('fadedivout', 'hide');
    }, 500);
    setTimeout(() => {
        introDiv.classList.replace('hide', 'fadedivin');
    }, 3000);
    setTimeout(() => {
        introDiv.classList.remove('fadedivin');
        cancelAnimationFrame(rAF);
    }, 4500);
}

textInput.addEventListener('input', () => {
    if(textInput.value !== '') {
        const suggestedOptions = [];

        if(dataList.classList.contains('hide')) {
            textInput.classList.remove('border-focus');
            dataList.classList.replace('hide', 'slidein');
            setTimeout(() => {
                dataList.classList.remove('slidein');
            }, 500);
        }

        options.forEach( element => {
            if(!element.classList.contains('hide')) element.classList.add('hide');
            if(element.selected) element.selected = false;
            if(element.textContent.startsWith(textInput.value) === true && element.classList.contains('hide')) suggestedOptions.push(element);
        });

        suggestedOptions.sort((a, b) => {
            if(a.textContent > b.textContent) return 1;
            if(a.textContent < b.textContent) return -1;
            return 0;
        });

        suggestedOptions.slice(0, 5)
        .forEach( elem => {
            elem.classList.replace('hide', 'fadein');
            setTimeout(() => {
                elem.classList.remove('fadein');
            }, 500);
        });
    } else {
        if(!dataList.classList.contains('hide')) {
            textInput.classList.add('border-focus');
            dataList.classList.add('slideout');

            options.forEach( element => {
                if(!element.classList.contains('hide')) {
                    element.classList.add('fadeout');
                    setTimeout(() => {
                        element.classList.replace('fadeout', 'hide');
                        dataList.classList.replace('slideout', 'hide');
                    }, 500);
                }
            });
        }
    }
});

textInput.addEventListener('blur', () => {
    if(!dataList.classList.contains('hide')) {
        textInput.classList.add('border-focus');
        dataList.classList.add('slideout');

        options.forEach( element => {
            if(!element.classList.contains('hide')) {
                element.classList.add('fadeout');
                setTimeout(() => {
                    element.classList.replace('fadeout', 'hide');
                    dataList.classList.replace('slideout', 'hide');
                }, 500);
            }
        });
    }
});

textInput.addEventListener('keyup', (e) => {
    if(e.key === 'ArrowDown' || e.key === 'ArrowUp' && !dataList.classList.contains('hide')) {
        const showingOptions = [];
        let selectedOptionIndex;

        options.forEach( element => {
            if(!element.classList.contains('hide')) {
                showingOptions.push(element);
            }
        });

        showingOptions.forEach((element, index) => {
            if(element.selected) {
                selectedOptionIndex = index;
                element.selected = false;
            }
        });

        if(e.key === 'ArrowDown') {
            if(!isNaN(selectedOptionIndex)) {
                if(selectedOptionIndex === showingOptions.length - 1) {
                    showingOptions[0].selected = true;
                } else {
                    showingOptions[selectedOptionIndex + 1].selected = true;
                }
            } else {
                showingOptions[0].selected = true;
            }
        }

        if(e.key === 'ArrowUp') {
            if(!isNaN(selectedOptionIndex)) {
                if(selectedOptionIndex === 0) {
                    showingOptions[showingOptions.length - 1].selected = true;
                } else {
                    showingOptions[selectedOptionIndex - 1].selected = true;
                }
            }
        }
    }
    if(e.key === 'Enter' && !dataList.classList.contains('hide')) {
        options.forEach( element => {
            if(element.selected) {
                textInput.value = element.value;
                showResults(element);
                textInput.blur();
            }
        });
    }
});

options.forEach( element => {
    element.addEventListener('click', () => {
        textInput.value = element.value;
        showResults(element);
    });
});

backButton.addEventListener('click', hideResults);

window.addEventListener('load', () => {
    lists.forEach((element, index) => {
        if(index % 2 === 0) element.lastChild.scrollIntoView();
    });
});