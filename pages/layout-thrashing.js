btn_do.onclick = () => {
    // Layout thrashing test
    // schedule rAF
    requestAnimationFrame(() => {
        console.log("rAF");
    });

    console.log("start");
    box1.style.height = "100px";
    console.log("changed");
};

btn_do2.onclick = () => {
    // Layout thrashing test
    // schedule rAF
    requestAnimationFrame(() => {
        console.log("rAF");
    });

    console.log("start");
    console.log(box1.getBoundingClientRect().height);
    box1.style.height = "100px";
    console.log(box1.getBoundingClientRect().height);
    console.log("changed");
};

btn_do3.onclick = () => {
    // Layout thrashing test
    // schedule rAF
    requestAnimationFrame(() => {
        console.log("rAF");
    });

    // with Performance API
    performanceWrapper("do3", () => {
        let tmp = 0;
        for (let i = 0; i < 1000; i++) {
            box1.style.height = i + "px";
            // occurs layout thrashing
            // Recalc style (offsetHeight)
            tmp += box1.offsetHeight + box2.offsetHeight;
        }

        /**
         * the properties of layout thrashing
         * 1. write to layout properties (width, height, padding, margin, etc.)
         * 2. and read from layout properties (offsetWidth, offsetHeight, clientWidth, clientHeight, etc.)
         */
    });
};

function performanceWrapper(label, func) {
    performance.clearMarks();
    performance.mark(`${label} start`);

    func();

    performance.mark(`${label} end`);
    console.log(performance.getEntries());
}
