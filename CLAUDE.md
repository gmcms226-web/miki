# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**HOT BISCUITS MIKIHOUSE** — 키즈 의류 브랜드 랜딩페이지. `miki-app/` 디렉터리가 메인 프로젝트이다 (React 19 + Vite). 루트의 `vite-project/`는 남아있는 초기 스캐폴딩이므로 무시한다.

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

- **왼쪽 Sidebar** (`width: 380px`, sticky): 로고 + 검색창 + 퀵태그 + 컬렉션 슬라이더. 1120px 이하에서 숨김.
- **오른쪽 Main** (`width: 600px`): Header → Hero → Collection → Shop → Video → Product → Store 순서로 세로 배치.
- **HamburgerMenu**: `menuOpen` 상태를 App에서 관리하고, Header의 버튼 클릭 → `onMenuOpen` prop → App state → HamburgerMenu의 `isOpen` prop 흐름으로 열고 닫는다.

### 컴포넌트 규칙

- `src/components/<ComponentName>/<ComponentName>.jsx` + `<ComponentName>.css` 쌍으로 구성.
- 함수형 컴포넌트만 사용 (TypeScript 금지, `.jsx` 한정).
- 스타일은 각 컴포넌트 폴더의 일반 CSS 파일만 사용. Tailwind, styled-components, CSS Module 모두 금지.
- 외부 UI 라이브러리 금지.

### 이미지

- 이미지는 `src/assets/images/` 에 위치.
- 코드 내 경로는 `/src/assets/images/파일명` 절대 경로로 참조 (예: `src="/src/assets/images/logo.png"`).

### 디자인 토큰

- 메인 포인트 컬러: `#FB8E4E`
- 배경: 흰색(`#fff`)
- 폰트: 본문은 Pretendard, 헤드라인/디스플레이 텍스트는 Jua (둘 다 CDN으로 `index.html`에 로드됨). 컴포넌트 CSS에서 `font-family: 'Pretendard', sans-serif` 또는 `'Jua', sans-serif`로 명시
- 그라디언트 사용 금지, 과도한 애니메이션 금지
- 반응형은 CSS `@media` query로 구현 (브레이크포인트 기준: 1120px)

### 미구현 섹션

현재 About Brand, Lookbook, Sale Banner, Character, Footer, TopButton은 아직 구현되지 않았다. `App.jsx`에 추가할 컴포넌트들이다.

## Linting

Oxlint 사용 (`miki-app/.oxlintrc.json`). `react/rules-of-hooks`는 error, `react/only-export-components`는 warn.
