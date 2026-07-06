# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**HOT BISCUITS MIKIHOUSE** — 키즈 의류 브랜드 사이트 (랜딩 + 컬렉션 판매 페이지 + Firebase 인증 + Polar 결제). `miki-app/` 디렉터리가 메인 프로젝트이다 (React 19 + Vite). 루트의 `vite-project/`는 남아있는 초기 스캐폴딩이므로 무시한다.

원본 사이트 캡처(`miki-app/screencapture-hotbiscuits-jp-*.png`)와 루트의 섹션별 PNG(`ZZ.PNG`, `SHOP매장.PNG`, `핫스프링.PNG`, `aboutbrand.PNG`)가 디자인 참고 자료다. 단, 텍스트/구성의 최종 기준은 사용자 지시와 사용자가 보내는 앱 스크린샷이다.

`AGENTS.md`는 이 파일의 미러(헤더 한 줄만 다름)이므로 CLAUDE.md 수정 시 함께 갱신한다.

## Commands

```bash
cd miki-app

npm run dev       # 개발 서버 (Vite HMR) — 보통 5174 포트 (5173 점유 중인 경우 많음)
npm run build     # 프로덕션 빌드
npm run preview   # 빌드 결과 미리보기
npm run lint      # oxlint 린트 검사
```

테스트 러너는 설정되어 있지 않다.

## Architecture

### 페이지 전환 (라우터 없음)

React Router를 쓰지 않는다. `App.jsx`의 `page` state(`'home' | 'spring' | 'summer' | 'brand' | 'pickup' | 'everyday'`)로 화면을 분기한다:

- `home`: 사이드바 + 메인 랜딩 (아래 레이아웃 구조 참고)
- `spring` / `summer`: `CollectionPage` — 룩북형 판매 페이지, 데이터는 `src/data/collections.js`. LOOK INDEX 클릭 시 `LookDetail`(룩 상세 화면)로 내부 전환. `.subpage-shell`로 Header + 드로어 유지.
- `brand`: `BrandPage` — 브랜드 정보 상세 (헤더 없음, 뒤로가기만)
- `pickup` / `everyday`: `PickupPage`(아기 속옷 특집) / `EverydayPage`(에브리데이 시리즈 특집 + 베스트 4 구매) — 둘 다 `.subpage-shell`로 Header + 드로어 유지

서브페이지에서 홈 섹션 앵커로 이동할 때는 `goHomeWithAnchor(hash)` → `pendingHash` state → 홈 렌더 후 `scrollIntoView` 흐름을 쓴다.

### 전역 상태 (전부 App.jsx)

- `user`: Firebase `onAuthStateChanged`로 구독. 로그인/회원가입은 `AuthModal`.
- `cartItems` / `favoriteItems` / `recentItems`: 장바구니·관심·최근 본 상품. `CartDrawer`, `MemberDrawer`에서 표시. 장바구니만 localStorage(`miki-cart-items`)에 보존되고, 관심·최근 본 상품은 새로고침 시 초기화.
- **로그인 게이트**: `requireLogin(action)` 래퍼 — 비로그인 상태에서 장바구니/관심/마이페이지 접근 시 로그인 모달을 띄운다. **BUY(즉시 구매)는 비회원도 허용.**
- 모달/드로어 open 상태(`menuOpen`, `authOpen`, `cartOpen`, `memberPanel`, `shopSelectOpen`)도 App에서 관리하고 prop으로 내려보낸다.

### 홈 레이아웃 구조

- **`.page-wrapper`**: `max-width: 1120px` + `justify-content: space-between`. 이 조합이 사이드바(380px)와 메인(600px)을 분리한다 — `space-between`을 빼면 두 영역이 붙어버린다.
- **왼쪽 Sidebar** (`width: 380px`, sticky): 로고 + 검색창 + 퀵태그 + 컬렉션 슬라이더. 1120px 이하에서 숨김.
- **오른쪽 Main** (`width: 600px`): Header → Hero → Collection → Shop → Video → Product → Store → AboutBrand → HotSpring → SaleBanner → Character → Footer 순서로 세로 배치.

### 상품 데이터와 결제 (Polar)

- 상품/룩북 데이터의 단일 소스는 `src/data/collections.js` (`COLLECTIONS.spring/summer` → looks → products). 상품별 `checkoutUrl`이 Polar(샌드박스) Checkout Link다.
- 상품의 `keywords` 배열은 사이드바 검색(`Sidebar.jsx`)이 이름·시즌 라벨과 함께 매칭에 사용한다 — 상품 추가 시 한/영 검색어를 함께 넣는다.
- 구매 흐름: `App.jsx handleBuy` — 로그인 상태면 `?customer_email=`로 이메일 프리필 후 `checkoutUrl`로 리다이렉트. 결제 완료 후 `?payment=success`로 복귀하면 App에서 감지해 완료 alert.
- **Polar 통화 함정**: 제품은 USD 필수 + 추가 통화(KRW)는 모든 칸을 채워야 한다. 하나라도 비면 해당 통화 접속자에게 Free/₩0으로 노출된다. 대시보드 목록은 USD만 표시하므로 KRW 검증은 checkout-links `{id}/redirect` → `/v1/checkouts/client/{secret}` JSON으로 확인한다.

### Firebase 인증

- `src/firebase.js` — config는 `miki-app/.env`의 `VITE_FIREBASE_*` 변수 6개 (.gitignore 등록됨, Vercel에도 동일하게 등록됨).
- 이메일/비밀번호 + Google 팝업 로그인 활성화 (Firebase 프로젝트 miki-47cbc).

### 컴포넌트 규칙

- `src/components/<ComponentName>/<ComponentName>.jsx` + `<ComponentName>.css` 쌍으로 구성.
- 함수형 컴포넌트만 사용 (TypeScript 금지, `.jsx` 한정).
- 스타일은 각 컴포넌트 폴더의 일반 CSS 파일만 사용. Tailwind, styled-components, CSS Module 모두 금지.
- 외부 UI 라이브러리 금지.

### 이미지

- 이미지는 `public/images/` 에 위치 (프로덕션 빌드에 포함되도록 public 사용 — `src/assets`에 두면 `<img>` 문자열 경로가 빌드에서 404 남).
- 코드 내 경로는 `/images/파일명` 절대 경로로 참조 (예: `src="/images/logo.png"`).
- 이미지 파일은 사용자가 직접 넣는다. 파일명이 예상과 다를 수 있으니(예: 윈도우 확장자 숨김으로 `shop.png.png`, 확장자·하이픈 누락 빈발) 새 이미지 참조 전 실제 파일명을 확인한다.

### 디자인 토큰

- 메인 포인트 컬러: `#FB8E4E`
- 배경: 흰색(`#fff`)
- 폰트: 본문은 Pretendard, 헤드라인/디스플레이 텍스트는 Jua (둘 다 CDN으로 `index.html`에 로드됨). 컴포넌트 CSS에서 `font-family: 'Pretendard', sans-serif` 또는 `'Jua', sans-serif`로 명시
- 그라디언트 사용 금지, 과도한 애니메이션 금지
- 반응형은 CSS `@media` query로 구현 (메인 브레이크포인트 1120px, 모바일 세부 조정 600px)

### 구현 패턴 참고

- **세로 스프라이트 시트 애니메이션** (AboutBrand, Character): 세로 시트를 `background-size`로 스케일하고, `@keyframes` + `steps()`/`step-end`로 `background-position`을 프레임 높이만큼 이동.
- **HotSpring 무한 마퀴**: 아이템 배열을 2세트 이어붙인 뒤 `translateX(-50%)` 무한 애니메이션으로 구현.
- **CollectionPage 크로스페이드**: 카드당 이미지 3장을 CSS 애니메이션(9s 주기, 3s씩 delay)으로 교차.

## Deployment

- GitHub `main` 푸시 → Vercel 자동 배포: **https://miki-o1w7.vercel.app** (Root Directory=`miki-app`, Vite 프리셋).
- 푸시는 사용자가 요청할 때만 한다.

## Linting

Oxlint 사용 (`miki-app/.oxlintrc.json`). `react/rules-of-hooks`는 error, `react/only-export-components`는 warn.
