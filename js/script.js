window.addEventListener("load", function(event) {
    const stageSliderWrapper = document.getElementById('stage-slider');
    const stageSliderItems = document.getElementById('slides');
    const stagePrev = document.getElementById('stage-prev');
    const stageNext = document.getElementById('stage-next');
    const stageDots = document.getElementById('stage-dots');

    function stageSlider(wrapper, items, prev, next, dotsWrapper) {
        var
            posInitial,
            slides = items.getElementsByClassName('slide'),
            slidesLength = slides.length,
            slideSize = items.getElementsByClassName('slide')[0].offsetWidth,
            index = 0,
            allowShift = true;

        for (let i = 0; i < slidesLength; i++) {
            let el = document.createElement("div");
            el.className = "stages-controls-dot";
            if (i == 0) {
                el.className = "stages-controls-dot active";
            }
            dotsWrapper.append(el)
        }

        const dots = dotsWrapper.getElementsByClassName("stages-controls-dot");

        prev.disabled = 'true';

        prev.addEventListener('click', function () { shiftSlide(-1) });
        next.addEventListener('click', function () { shiftSlide(1) });
        items.addEventListener('transitionend', checkIndex);

        function shiftSlide(dir, action) {
            items.classList.add('shifting');

            if (allowShift) {
                if (!action) { posInitial = items.offsetLeft; }

                if (dir == 1) {
                    items.style.left = (posInitial - slideSize) + "px";
                    index++;
                } else if (dir == -1) {
                    items.style.left = (posInitial + slideSize) + "px";
                    index--;
                }
            };

            allowShift = false;
        }

        function checkIndex (){
            items.classList.remove('shifting');

            prev.disabled = false;
            next.disabled = false;

            if (index == 0) {
                prev.disabled = true;
            }

            if (index == slidesLength - 1) {
                next.disabled = true;
            }

            for (let i = 0; i < dots.length; i++) {
                let el = dots[i];
                el.classList.remove('active')
                if (index == i) el.classList.add('active')
            }

            allowShift = true;
        }
    }

    stageSlider(stageSliderWrapper, stageSliderItems, stagePrev, stageNext, stageDots);
});
