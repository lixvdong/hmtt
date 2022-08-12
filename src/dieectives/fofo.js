const direct = {
  install(Vue) {
    Vue.directive('fofo', {
      inserted(el) {
        const input = el.querySelector('input')
        input.focus()
      }
    })
  }
}

export default direct
