export default function ({ app }, inject) {
  // eslint-disable-next-line no-var
  var audio = []

  /**
   * Play sound by name
   *
   * @param {String} sound
   * @param {Boolean} repeat
   * @param {Number} delay
   *
   * Usage: this.$sound(soundName, repeat, delay)
   * Example: this.$sound('demo', false, 3000) — returns demo sound after 3 seconds
   */
  const sound = (sound, repeat = false, delay = 0) => {
    navigator.mediaSession.setActionHandler('play', function () {})

    const sounds = {
      demo: {
        name: 'demo',
        volume: 0.1,
      },
    }

    if (typeof sounds[sound] === 'undefined') return

    audio[sound] = new Audio(
      `${process.env.DOMAIN}/static/sounds/${sounds[sound].name}.mp3`
    )
    audio[sound].volume = sounds[sound].volume
    audio[sound].loop = repeat

    setTimeout(() => {
      audio[sound].play()
    }, delay)
  }

  /**
   * Stop sound by name
   *
   * @param {String} sound
   *
   * Usage: this.$stopSound(soundName)
   */
  const stopSound = (sound) => {
    audio[sound].pause()
    audio[sound].src = ''
  }

  inject('sound', sound)
  inject('stopSound', stopSound)
}
