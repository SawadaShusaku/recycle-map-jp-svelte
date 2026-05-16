<script lang="ts">
  /**
   * ウェーブ（波線）やジグザグなどのライン装飾コンポーネント
   */
  let {
    size = 150,
    color = "#FFD180",
    strokeWidth = 8,
    variant = "wave",
    opacity = 0.9,
    className = "",
  } = $props<{
    size?: number;
    color?: string;
    strokeWidth?: number;
    variant?: "wave" | "squiggle" | "line";
    opacity?: number;
    className?: string;
  }>();
</script>

<svg 
  width={size} 
  height={size / 2} 
  viewBox="0 0 200 100" 
  xmlns="http://www.w3.org/2000/svg"
  class={className}
  style="opacity: {opacity};"
>
  <path 
    fill="none" 
    stroke={color} 
    stroke-width={strokeWidth} 
    stroke-linecap="round"
    stroke-linejoin="round"
    d={
      variant === 'wave' 
        ? "M 10 50 Q 30 20 50 50 T 90 50 T 130 50 T 170 50 T 210 50" // なめらかな波線
      : variant === 'squiggle'
        ? "M 10 50 C 30 10, 50 90, 70 50 C 90 10, 110 90, 130 50 C 150 10, 170 90, 190 50" // ループに近い波線
      : "M 20 50 L 180 50" // ただの直線
    }
  />
</svg>
