<script lang="ts">
  /**
   * ドットパターン（水玉）のUI装飾コンポーネント
   */
  let {
    size = 100,
    color = "#C1E1C1",
    rows = 5,
    cols = 5,
    dotRadius = 6,
    spacing = 25,
    opacity = 0.8,
    className = "",
  } = $props<{
    size?: number;
    color?: string;
    rows?: number;
    cols?: number;
    dotRadius?: number;
    spacing?: number;
    opacity?: number;
    className?: string;
  }>();

  let width = $derived(cols * spacing);
  let height = $derived(rows * spacing);
</script>

<svg 
  width={size} 
  height={size} 
  viewBox="0 0 {width} {height}" 
  xmlns="http://www.w3.org/2000/svg"
  class={className}
  style="opacity: {opacity};"
>
  <g fill={color}>
    {#each Array(rows) as _, y}
      {#each Array(cols) as _, x}
        <circle 
          cx={(x * spacing) + (spacing / 2)} 
          cy={(y * spacing) + (spacing / 2)} 
          r={dotRadius} 
        />
      {/each}
    {/each}
  </g>
</svg>
