import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  name: 'MapApp',

  setup() {
    // Реактивные переменные для хранения координат метки
    let x = ref(0)
    let y = ref(0)

    // Реактивная переменная для доступа до ноды маркера
    const pin = ref(null)

    /**
     * Обработчик клика по карте для установки координат метки
     * @param {MouseEvent} event
     */
    function handleClick(event) {
      x.value = event.offsetX
      y.value = event.offsetY
    }

    // Следим за X и Y для установки нового положения
    watch([x, y], ([newX, newY]) => {
      // Находим метку и изменяем её положение
      const pinNode = pin.value
      if (pinNode) {
        pinNode.style.left = `${newX}px`
        pinNode.style.top = `${newY}px`
      }
    })

    return {
      handleClick,
      pin,
    }
  },

  template: `
    <div class="map" @click="handleClick">
      <img class="map-image" src="./map.png" alt="Map" draggable="false" />
      <span ref="pin" class="pin">📍</span>
    </div>
  `,
})
