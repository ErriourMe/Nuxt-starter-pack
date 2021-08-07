export const toastConfig = {
  duration: 10000,
  queue: true,
  position: 'bottom-right',
  action: {
    text: '×',
    onClick: (e, toastObject) => {
      toastObject.goAway(0)
    },
  },
}
