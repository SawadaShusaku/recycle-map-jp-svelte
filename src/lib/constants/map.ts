// ---- Marker icon dimensions ----
export const MARKER_ICON_WIDTH = 32;
export const MARKER_ICON_HEIGHT = 42;
export const MARKER_ICON_SIZE = 27 / MARKER_ICON_WIDTH;

// ---- Cluster zoom thresholds ----
// 低ズーム → 高ズーム: 都道府県クラスター → 広域クラスター(23区) → 市区町村クラスター → 個別マーカー
export const CLUSTER_TRANSITION_ZOOM = 11.85; // 個別マーカー⇔集約クラスターの切り替わり閾値
export const PREFECTURE_SUMMARY_MAX_ZOOM = 8.8; // このズーム以下で都道府県クラスター表示
export const INDIVIDUAL_MARKER_MIN_ZOOM = CLUSTER_TRANSITION_ZOOM; // 個別マーカー表示する最低ズーム
export const WARD_SUMMARY_MAX_ZOOM = CLUSTER_TRANSITION_ZOOM; // 市区町村クラスター表示する最大ズーム
export const WARD_SUMMARY_CLICK_ZOOM = 13; // 市区町村クラスタークリック時の固定ズームインレベル
export const PREFECTURE_CLICK_ZOOM = 9.2; // 都道府県クラスタークリック時の固定ズームインレベル
export const CLUSTER_PREFECTURE_ZOOM = 8; // 都道府県クラスター表示開始ズーム
export const CLUSTER_WIDE_AREA_ZOOM = 9; // 広域（東京23区レベル）クラスター表示ズーム
export const CLUSTER_WARD_AREA_ZOOM = 10; // 市区町村クラスター表示ズーム
export const JAPAN_WIDE_CLUSTER_MAX_ZOOM = 5; // このズーム以下で日本全国統合クラスター表示

export interface ClusterZoomValues {
  prefecture: number;
  municipality: number;
}

// ラベルのフォントサイズ（px）
export const CLUSTER_TEXT_SIZE_PX: ClusterZoomValues = {
  prefecture: 13,
  municipality: 16,
};

// ---- Administrative area colors ----
export const CLUSTER_COLOR = "#0f766e"; // 行政区域の塗り・枠線色

// ---- Label style ----
export const CLUSTER_CIRCLE_STROKE_COLOR = "#ffffff"; // ラベルテキスト色
export const CLUSTER_LABEL_HALO_COLOR = "#064e3b"; // ラベル縁取り色
export const CLUSTER_COUNT_FONT_SCALE = 0.88; // 施設数カウントのフォントスケール
export const CLUSTER_LABEL_LINE_HEIGHT = 1.28; // ラベルの行高
export const CLUSTER_LABEL_HALO_WIDTH = 0.6; // ラベル縁取りの幅（薄め）
export const CLUSTER_LABEL_HALO_BLUR = 0.6; // ラベル縁取りのブラー（ぼかし強め）

// ---- Prefecture cluster radius calculation ----
export const CLUSTER_WIDE_AREA_RADIUS_PX = 28;
export const CLUSTER_WARD_AREA_RADIUS_PX = 35;

// ---- Map tiles ----
export const DEFAULT_MAP_STYLE_URL =
  "https://tiles.openfreemap.org/styles/liberty";

// ---- Bottom sheet dimensions ----
export const SHEET_DEFAULT_VH = 60;
export const SHEET_MIN_VH = 22;
export const SHEET_MAX_VH = 92;
export const SHEET_CLOSE_THRESHOLD_VH = 18;

// ---- Gesture thresholds ----
export const SWIPE_THRESHOLD_PX = 40;

// ---- Animation defaults ----
export const PAN_DURATION_MS = 300;
export const FIT_DURATION_MS = 500;
export const MOBILE_PAN_OFFSET_RATIO = 0.25;
export const MOBILE_FIT_OFFSET_RATIO = 0.2;
export const FIT_PADDING_DESKTOP = 80;
export const FIT_PADDING_MOBILE = 60;
