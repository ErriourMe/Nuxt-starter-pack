module.exports = (options) =>
  `
    <div class="toast-card">
      <div class="toast-content">
        ${
          options.image || options.icon
            ? options.icon
              ? `
              <div class="toast-content__image">
                <svg class="toast-content__icon">
                  <use xlink:href="#icon-${options.icon}"></use>
                </svg>
              </div>
            `
              : `
              <div class="toast-content__image">
                <img src="${options.image}" alt="Notification image" />
              </div>
            `
            : ``
        }
        <div class="toast-content__data">
            ${
              options.title
                ? `<div class="toast-content__title">${options.title}</div>`
                : ``
            }
            ${
              options.text
                ? `<div class="toast-content__message">${options.text}</div>`
                : ``
            }
        </div>
      </div>
    </div>
  `
