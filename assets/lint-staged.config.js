module.exports = {
  "*.{json,js,jsx,ts,tsx,md,html,css}": "prettier --write",
  "src/**/**.{js,jsx,ts,tsx,md,html,css}": ["eslint --fix"],
};
