# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**HOT BISCUITS MIKIHOUSE** — 키즈 의류 브랜드 랜딩페이지. `miki-app/` 디렉터리가 메인 프로젝트이다 (React 19 + Vite). 루트의 `vite-project/`는 남아있는 초기 스캐폴딩이므로 무시한다.

원본 사이트 캡처(`miki-app/screencapture-hotbiscuits-jp-*.png`)와 루트의 섹션별 PNG(`ZZ.PNG`, `SHOP매장.PNG`, `핫스프링.PNG`, `aboutbrand.PNG`)가 디자인 참고 자료다. 단, 텍스트/구성의 최종 기준은 사용자 지시와 사용자가 보내는 앱 스크린샷이다.

## Commands

```bash
cd miki-app

npm run dev       # 개발 서버 (Vite HMR)
npm run build     # 프로덕션 빌드
npm run preview   # 빌드 결과 미리보기
npm run lint      # oxlint 린트 검사
```

테스트 러너는 설정되어 있지 않다.

## Architecture

### 레이아웃 구조

`App.jsx`가 두 영역을 나란히 배치한다:

- **`.page-wrapper`**: `max-width: 1120px` + `justify-content: space-between`. 이 조합이 사이드바(380px)와 메인(600px)을 분리한다 — `space-between`을 빼면 두 영역이 붙어버린다.
- **왼쪽 Sidebar** (`width: 380px`, sticky): 로고 + 검색창 + 퀵태그 + 컬렉션 슬라이더. 1120px 이하에서 숨김.
- **오른쪽 Main** (`width: 600px`): Header → Hero → Collection → Shop → Video → Product → Store → AboutBrand → HotSpring 순서로 세로 배치.
- **HamburgerMenu**: `menuOpen` 상태를 App에서 관리하고, Header의 버튼 클릭 → `onMenuOpen` prop → App state → HamburgerMenu의 `isOpen` prop 흐름으로 열고 닫는다.

### 컴포넌트 규칙

- `src/components/<ComponentName>/<ComponentName>.jsx` + `<ComponentName>.css` 쌍으로 구성.
- 함수형 컴포넌트만 사용 (TypeScript 금지, `.jsx` 한정).
- 스타일은 각 컴포넌트 폴더의 일반 CSS 파일만 사용. Tailwind, styled-components, CSS Module 모두 금지.
- 외부 UI 라이브러리 금지.

### 이미지

- 이미지는 `public/images/` 에 위치 (프로덕션 빌드에 포함되도록 public 사용 — `src/assets`에 두면 `<img>` 문자열 경로가 빌드에서 404 남).
- 코드 내 경로는 `/images/파일명` 절대 경로로 참조 (예: `src="/images/logo.png"`).
- 이미지 파일은 사용자가 직접 넣는다. 파일명이 예상과 다를 수 있으니(예: 윈도우 확장자 숨김으로 `shop.png.png`) 새 이미지 참조 전 실제 파일명을 확인한다.

### 디자인 토큰

- 메인 포인트 컬러: `#FB8E4E`
- 배경: 흰색(`#fff`)
- 폰트: 본문은 Pretendard, 헤드라인/디스플레이 텍스트는 Jua (둘 다 CDN으로 `index.html`에 로드됨). 컴포넌트 CSS에서 `font-family: 'Pretendard', sans-serif` 또는 `'Jua', sans-serif`로 명시
- 그라디언트 사용 금지, 과도한 애니메이션 금지
- 반응형은 CSS `@media` query로 구현 (브레이크포인트 기준: 1120px)

### 구현 패턴 참고

- **AboutBrand 스프라이트 애니메이션**: 150×900(6프레임) 세로 시트를 `background-size`로 스케일하고, `@keyframes` + `step-end`로 `background-position`을 프레임 높이만큼 이동시키는 방식.
- **HotSpring 무한 마퀴**: 아이템 배열을 2세트 이어붙인 뒤 `translateX(-50%)` 무한 애니메이션으로 구현.

### 미구현 섹션

ABOUT BRAND 상단 타이틀 영역(아이콘 + 타이틀 + 소제목), NEWS, SHOP TOPICS, Character, Footer, TopButton은 아직 구현되지 않았다. `App.jsx`에 추가할 컴포넌트들이다.

## Linting

Oxlint 사용 (`miki-app/.oxlintrc.json`). `react/rules-of-hooks`는 error, `react/only-export-components`는 warn.
