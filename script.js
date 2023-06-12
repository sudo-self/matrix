class Scrambled {
    constructor() {
        this.containers = document.querySelectorAll(".js-scrambled");
        this.characters = "jesseroperjessejesseroperoperjessejesse";
        this.charWidth = 9;
        this.charHeight = 19;
        this.position = {
            x: 0,
            y: 0
        };
        this.init();
    }

    init() {
        if (this.containers.length < 1) {
            return;
        }

        // initial fill
        this.containers.forEach((container) => {
            this.fillContainer(container, this.characters);
        });

        this.events();
    }

    events() {
        // mouse move fill
        this.containers.forEach((container) => {
            container.addEventListener("mousemove", (event) => {
                gsap.to(this.position, {
                    x: event.pageX - event.currentTarget.offsetLeft,
                    y: event.pageY - event.currentTarget.offsetTop,
                    ease: "power3.out",
                    duration: 0.5,
                    onUpdate: () => {
                        container.style.setProperty(
                            "--x",
                            `${this.position.x}px`
                        );
                        container.style.setProperty(
                            "--y",
                            `${this.position.y}px`
                        );
                    }
                });
                this.fillContainer(container, this.characters);
            });
        });

        // window resize fill
        window.addEventListener("resize", (event) => {
            this.containers.forEach((container) => {
                this.fillContainer(container, this.characters);
            });
        });
    }

    fillContainer(container, characters) {
        let string = "";
        const charactersLength = characters.length;

        const width = container.offsetWidth;
        const height = container.offsetHeight;

        const stringLength =
            Math.floor(width / this.charWidth) *
            Math.floor(height / this.charHeight);

        for (let i = 0; i < stringLength; i++) {
            string += characters.charAt(
                Math.floor(Math.random() * charactersLength)
            );
        }

        container.innerHTML = string;
    }
}

window.addEventListener("DOMContentLoaded", (event) => {
    const scrambled = new Scrambled();
    scrambled.init();
});
