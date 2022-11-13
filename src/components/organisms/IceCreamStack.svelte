<script lang="ts">
  import { renderObject } from '../../features/matter'
  renderObject()
  // props
  export let flavors: Array<String>
</script>

<div>
  <ul>
    {#each flavors as flavor, i}
      <li>
        {flavor}
      </li>
    {/each}
  </ul>
</div>
