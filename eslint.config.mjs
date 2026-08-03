import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  eslintPluginPrettierRecommended, // Prettier 설정 통합 (충돌 방지 + 포맷터 에러 감지)
  {
    rules: {
      "prettier/prettier": "error", // Prettier 규칙 위반 시 ESLint 에러로 표시
      "no-unused-vars": "warn", // 안 쓰는 변수 경고
      "no-console": "warn", // console.log() 사용 경고
      "react-hooks/rules-of-hooks": "error", // React Hook 규칙 엄격 준수
      "react-hooks/exhaustive-deps": "warn", // Hook 의존성 배열 누락 경고
    },
  },
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
