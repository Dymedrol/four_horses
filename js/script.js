window.addEventListener("load", function(event) {
    const stageSliderWrapper = document.getElementById('stage-slider');
    const stageSliderItems = document.getElementById('stage-slides');
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

















    var slider = document.getElementById('participants-slider'),
        sliderItems = document.getElementById('participants-slides'),
        prev = document.getElementById('participants-prev'),
        next = document.getElementById('participants-next');

    const participantsCounter = document.getElementById('participants-counter');

    function slide(wrapper, items, prev, next) {
        var posInitial,
            slides = items.getElementsByClassName('slide'),
            slidesLength = slides.length,
            slideSize = items.getElementsByClassName('slide')[0].offsetWidth,
            firstSlide = slides[0],
            lastSlide = slides[slidesLength - 1],
            cloneFirst = firstSlide.cloneNode(true),
            cloneLast = lastSlide.cloneNode(true),
            index = 0,
            allowShift = true;

        // Clone first and last slide
        items.appendChild(cloneFirst);
        items.insertBefore(cloneLast, firstSlide);
        wrapper.classList.add('loaded');
        document.getElementById('participants-total').textContent = slidesLength;
        const  counter = document.getElementById('participants-count');
        counter.textContent = 1;


        setInterval(function() {shiftSlide(1)}, 4000);


        // Click events
        prev.addEventListener('click', function () { shiftSlide(-1) });
        next.addEventListener('click', function () { shiftSlide(1) });

        // Transition events
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

            if (index == -1) {
                items.style.left = -(slidesLength * slideSize) + "px";
                index = slidesLength - 1;
            }

            if (index == slidesLength) {
                items.style.left = -(1 * slideSize) + "px";
                index = 0;
            }

            counter.textContent = index + 1;

            allowShift = true;
        }
    }

    slide(slider, sliderItems, prev, next);
});
