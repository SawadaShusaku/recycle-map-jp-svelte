## Why

現在、ズームレベルが低い場合（例: ズーム3以下）でも都道府県単位の47個のクラスターが表示される。日本全体を俯瞰する際、47個のクラスターは視覚的ノイズとなり、全国規模での施設分布の全体像を捉えにくい。全国を1つのクラスターに統合することで、低ズーム時のUIを簡潔にし、ユーザーが日本全体の施設数を一目で把握できるようにする。

## What Changes

- `src/lib/constants/map.ts` に低ズーム統合クラスターの閾値を定義する定数を追加（例: `JAPAN_WIDE_CLUSTER_MAX_ZOOM = 3`）
- ズームレベルが閾値以下の場合、都道府県クラスターの代わりに「日本全国」を表す1つの統合クラスターを表示
- 統合クラスターには全国の施設総数を表示
- 統合クラスターのクリック時は、既存の都道府県クラスタークリック時と同様にズームイン（`PREFECTURE_CLICK_ZOOM` 相当のレベルへ移動）
- 閾値定数は調整可能にし、将来的なUXチューニングに対応

## Capabilities

### New Capabilities
- `japan-wide-cluster`: 低ズーム時（閾値以下）に全国を1つのクラスターとして表示する機能

### Modified Capabilities
- `administrative-area-summaries`: 低ズーム域において、都道府県サマリーではなく全国統合サマリーを表示する要件を追加

## Impact

- `src/lib/constants/map.ts` — 新しいズーム閾値定数の追加
- `src/lib/map/` またはマップレイヤー関連コンポーネント — 低ズーム時のクラスター表示ロジック変更
- `administrative-area-summaries` spec — 全国統合クラスターの要件追加
