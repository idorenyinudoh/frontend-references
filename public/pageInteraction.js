const textInput = document.getElementById('text-input');
const dataList = document.querySelector('datalist');
const options = document.querySelectorAll('option');

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
            if(element.textContent.startsWith(textInput.value) === true && element.classList.contains('hide')) suggestedOptions.push(element);
        });

        suggestedOptions.sort((a, b) => {
            if(a.textContent > b.textContent) return 1;
            if(a.textContent < b.textContent) return -1;
            return 0;
        });

        suggestedOptions.filter((element, index) => {
            if(index >= 0 && index < 5) return element;
        }).forEach( elem => {
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