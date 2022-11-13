<script lang="ts">
  // TODO: UIがインフラに直接アクセスしてるのでよくなさそう
  import renderObject from '../../features/physics_calculation/matter.infrastracture'
  // todo: この型infraと共通化したい 切り出したい
  type position = {
    x: number
    y: number
  }

  // data
  let iceCreamPosition: position = { x: 0, y: 0 }
  export let flavors: Array<String>

  // main
  renderObject(updatePosition)
  function updatePosition(val: position) {
    console.log(val)
    iceCreamPosition = val
  }
</script>

<div>
  {iceCreamPosition.x}
  {iceCreamPosition.y}
  <ul>
    {#each flavors as flavor, i}
      <li>
        {flavor}
      </li>
    {/each}
  </ul>
</div>
