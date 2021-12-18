<template>
  <b-modal :id="id" class="confirm-modal" centered size="md" hide-header>
    <div class="d-flex flex-column align-items-center text-center">
      <div v-if="!notificationSlot">
        {{ text }}
      </div>
      <div class="confirm-modal__notification">
        <slot name="notification" />
      </div>
    </div>

    <template #modal-footer>
      <div class="d-flex justify-content-center w-100 my-3">
        <button
          class="btn btn-primary w-35 justify-content-center mr-2"
          @click="$bvModal.hide(id)"
        >
          {{ confirmText || $t('global.no') }}
        </button>
        <button
          class="btn btn-danger w-35 justify-content-center ml-2"
          @click="confirm"
        >
          {{ denyText || $t('global.yes') }}
        </button>
      </div>
    </template>
  </b-modal>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: false,
      default: '',
    },
    confirmText: {
      type: String,
      required: false,
      default: '',
    },
    denyText: {
      type: String,
      required: false,
      default: '',
    },
  },
  computed: {
    notificationSlot() {
      return this.$slots?.notification
        ? this.$slots?.notification[0]?.text
        : null
    },
  },
  methods: {
    confirm() {
      this.$emit('confirm')
    },
  },
}
</script>

<style lang="scss">
.confirm-modal {
  &__notification {
    font-weight: 600;
    font-size: 20px;
    line-height: 140%;
    color: #00182f;
    width: 75%;
    margin: -20px 0 20px;
    text-transform: uppercase;
  }
}
</style>
