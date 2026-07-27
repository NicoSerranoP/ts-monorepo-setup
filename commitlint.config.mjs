export default {
  extends: ["@commitlint/config-conventional"],
  ignores: [(message) => /Signed-off-by: dependabot\[bot]/m.test(message)],
  rules: {
    "scope-empty": [2, "never"],
    "subject-empty": [2, "never"],
  },
};
