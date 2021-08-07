import Vue from 'vue'
import GlobalEvents from 'vue-global-events'
import SvgIcon from '~/components/SvgIcon'

export default function () {
  Vue.component('SvgIcon', SvgIcon)
  Vue.component('GlobalEvents', GlobalEvents)
}
