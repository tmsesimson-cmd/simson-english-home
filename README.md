# 심슨영어 홈페이지 (독립 배포용)

> ⚠️ **이 repo의 파일은 직접 수정하지 마세요.**
>
> 메인 홈페이지의 **단일 원본은 LMS 프로젝트**에 있습니다:
> `심슨파트너스 프로그램/static/site/`
>
> LMS는 이 원본을 루트(`/`)에서 그대로 서빙합니다
> (예: https://simlab-a0t6.onrender.com/ ).

## 수정 방법

1. `심슨파트너스 프로그램/static/site/` 에서 `index.html` / `guide.html` / `css` / `js` 를 수정
2. LMS 프로젝트에서 동기화 실행:
   ```
   python sync_homepage.py
   ```
   → 이 repo의 파일이 원본과 동일하게 갱신됩니다.
3. 이 repo를 별도 도메인에도 배포한다면 여기서 `git commit` / `git push`

이렇게 하면 홈페이지를 **한 곳(LMS static/site)** 에서만 관리합니다.
