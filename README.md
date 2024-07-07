# React-TS-TailwindCSS-Vite-VSCode Template

このプロジェクトは、React、TypeScript、Tailwind CSS、Viteを使用した学習開発環境のテンプレートです。VSCodeの設定も含まれており、効率的な開発をサポートします。

## 特徴

- React 18.3.1
- TypeScript 5.2.2
- Tailwind CSS 3.4.4
- Vite 5.3.1
- ESLint & Prettier による自動フォーマット
- VSCode用の最適化された設定

## VSCode設定

このプロジェクトには、`.vscode/settings.json`ファイルが含まれており、以下の設定が行われています：

- 保存時、貼り付け時、入力時に自動フォーマット
- デフォルトフォーマッターとしてPrettierを使用
- 保存時にESLintの自動修正を実行

## ESLint設定

`.eslintrc.cjs`ファイルには、以下の設定が含まれています：

- TypeScriptサポート
- React Hooksのリントルール
- Tailwind CSSの推奨設定
- その他のベストプラクティス

## ドキュメント (doc)

doc フォルダには、このプロジェクトに関するドキュメントが保存されています。

- **features.md:** プロジェクトの機能一覧と詳細な説明
- **screen-transition.drawio.png:** 画面遷移図
- **ui.drawio.png:** UI 設計図
- **use-case.drawio.png:** ユースケース図

これらのドキュメントを参照することで、プロジェクトの全体像や詳細な仕様を把握することができます。

## 始め方

1. リポジトリをクローンする:

   ```bash
   git clone https://github.com/<自分の名前>/React-TS-TailwindCSS-Vite-VS-Code-Template.git
   ```

２. クローンしたディレクトリの名称を変更:

   ```bash
   mv React-TS-TailwindCss-Vite-Vscode-templete-study/ 作るプロジェクトの名称/
   ```

3. 依存関係をインストールする:

   ```bash
   npm install
   ```

4. 開発サーバーを起動する:

   ```bash
   npm run dev
   ```

5. ブラウザを開き、`http://localhost:5173` にアクセスして、アプリの動作を確認します。

6. こちらの画面が表示されたらOK
![スクリーンショット 2024-06-24 16 07 38](https://github.com/hirorotaka/React-TS-TailwindCss-vite-Vscode-templete/assets/153050316/f150e6fa-4d67-4b99-af3e-13123d4b795a)

7. リモートリポジトリの変更:
   
   ※originで管理していくため、またテンプレートの方へのコミット防止
   ```bash
   git remote set-url origin git@github.com:hirorotaka/<コミット先のリポジトリ名>.git
   ```
   リポジトリが変更されていることの確認
   ```bash
   git remote -v
   ``` 
