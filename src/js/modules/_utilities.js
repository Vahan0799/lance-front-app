import $ from 'jquery'

export function clickOutSide(wrapper, container, activeClass, hideFunction) {
    // wrapper - the wrapper parent of modal/popup,
    // container - {
    //          if clicked outside of container where the modal information is,
    //          can also be declared 'wrapper' element if there isn't a container
    // }
    // activeClass - class that wrapper gets to activate the modal/popup
    // hideFunction - if there's an additional function that should happen during modal/popup close
    $(window).on('click', event => {
        if (!$(wrapper).hasClass(activeClass)) return
        if (hideFunction) {
            if (!event.target.closest(container)) hideFunction()
        }
        if (!event.target.closest(container)) {
            $(wrapper).removeClass(activeClass)
        }
    })
}
