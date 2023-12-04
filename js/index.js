// const sidebar = document.querySelector(".side-bar");

// const plusButton = document.querySelector(".plus");
// console.log(plusButton);
// const closeButton = document.querySelector(".close");

// plusButton.addEventListener("click", (e) => {
//     sidebar.classList.add('fadeIn')
//     sidebar.classList.remove('fadeOut')
    
// });

// closeButton.addEventListener("click", () => {
//         sidebar.classList.add('fadeOut')
//         sidebar.classList.remove('fadeIn')
// })



window.onload = function(){
    const sidebar = document.querySelector(".side-bar");
    const plusButton = document.querySelector(".plus");
    const closeButton = document.querySelector(".close");
    const main = document.querySelector(".main")

    
    plusButton.addEventListener("click", (e) => {
        sidebar.classList.add('fadeIn');
        sidebar.classList.remove('fadeOut');
        main.style.visibility = "hidden"
    });

    closeButton.addEventListener("click", (e) => {
        sidebar.classList.add('fadeOut');
        sidebar.classList.remove('fadeIn');
        main.style.visibility = "visible"
    });
}
