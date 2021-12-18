import Vue from 'vue'
import GlobalEvents from 'vue-global-events'
import SvgIcon from '~/components/SvgIcon'
import InputField from '~/components/Fields/InputField'
import ConfirmModal from '~/components/Modals/ConfirmModal'

export default function () {
  Vue.component('SvgIcon', SvgIcon)
  Vue.component('GlobalEvents', GlobalEvents)

  Vue.component('InputField', InputField)
  Vue.component('ConfirmModal', ConfirmModal)
}
