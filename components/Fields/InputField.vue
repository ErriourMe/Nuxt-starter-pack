<template>
  <div :class="`form-group ${groupClass}`">
    <label v-if="title">{{ title }}</label>
    <div class="input-field">
      <input
        v-model="model"
        :type="type"
        :min="min"
        :minlength="min"
        :max="max"
        :maxlength="max"
        :class="`input-field__input form-control ${
          validation.length ? `is-invalid` : ``
        } ${fieldClass}`"
        :placeholder="placeholder"
        @input="checkInput"
      />
      <button v-if="!model" class="input-field__icon">
        <SvgIcon sprite="outline" :name="icon" />
      </button>
      <button v-else class="input-field__cleartext" @click="model = ''">
        <SvgIcon sprite="outline" name="close" />
      </button>
    </div>
    <div class="invalid-feedback">
      <div v-for="(error, i) in validation" :key="`errors-${i}`">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'input',
  },
  props: {
    title: {
      type: String,
      required: false,
      default: '',
    },
    icon: {
      type: String,
      required: false,
      default: '',
    },
    min: {
      type: Number,
      required: false,
      default: null,
    },
    max: {
      type: Number,
      required: false,
      default: null,
    },
    type: {
      type: String,
      required: false,
      default: 'text',
    },
    placeholder: {
      type: String,
      required: false,
      default: '',
    },
    validation: {
      type: Array,
      required: false,
      default: () => [],
    },
    delay: {
      type: Number,
      required: false,
      default: 0,
    },
    fieldClass: {
      type: String,
      required: false,
      default: '',
    },
    groupClass: {
      type: String,
      required: false,
      default: '',
    },

    /// ///////// ///
    value: {
      type: String,
      required: false,
      default: '',
    },
  },
  data() {
    return {
      isTyping: false,
    }
  },
  computed: {
    model: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      },
    },
  },
  watch: {
    model(val) {
      if (this.delay > 0) {
        setTimeout(this.debounce, this.delay)
      }
    },
    isTyping(val) {
      if (!val) {
        this.$emit('update')
      }
    },
  },
  methods: {
    checkInput() {
      return this.delay ? (this.isTyping = true) : null
    },
    debounce() {
      this.isTyping = false
    },
  },
}
</script>

<style lang="scss">
.input-field {
  width: 100%;
  position: relative;

  &__input {
    padding-right: 40px;
  }

  &__icon {
    background: transparent;
    color: #a2abb0;
    border: none;
    position: absolute;
    top: calc(50% - 15px);
    right: 12px;

    svg {
      width: 16px;
      height: 16px;
    }
  }

  &__cleartext {
    background: transparent;
    color: #a2abb0;
    border: none;
    position: absolute;
    top: calc(50% - 11px);
    right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      svg {
        background: #dce7f3;
      }
    }

    svg {
      width: 20px;
      height: 20px;
      padding: 2px;
      border-radius: 50%;
      background: #e6e9ec;
    }
  }
}
</style>
