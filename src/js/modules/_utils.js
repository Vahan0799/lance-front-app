import $ from "jquery";

export function clickOutSide(callback, ...exceptEle) {
    if (exceptEle) {
        let elements = document.querySelectorAll(exceptEle[0]);

        const handleClick = (e) => {
            let target = e.target;
            let isOutSide = exceptEle.every((ele) => !target.closest(ele));
            if (isOutSide) {
                callback && elements.forEach((element) => callback(element));
            }
        };
        document.addEventListener('click', handleClick);
    }
}