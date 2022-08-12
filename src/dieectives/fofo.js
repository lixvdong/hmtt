const direct = {
  install(Vue) {
    Vue.directive('fofo', {
      inserted(el) {
        if (el.nodeName === 'INPUT' || el.nodeName === 'TEXTAREA') {
          // 如果直接是input标签/textarea标签
          el.focus()
        } else {
          const input = el.querySelector('input')
          input.focus()
        }
      },
      update(el) {
        if (el.nodeName === 'INPUT' || el.nodeName === 'TEXTAREA') {
          // 如果直接是input标签/textarea标签
          el.focus()
        } else {
          const input = el.querySelector('input')
          input.focus()
        }
      }
    })
  }
}

export default direct
