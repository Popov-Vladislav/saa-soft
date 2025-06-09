module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recommended-vue'
  ],
  rules: {
    'indentation': 2,
    'no-eol-whitespace': true,
    'no-missing-end-of-source-newline': true,
    'max-empty-lines': 1,

    'selector-class-pattern': '^[a-z][a-z0-9]*(-[a-z0-9]+)*$',
    'selector-id-pattern': '^[a-z][a-z0-9]*(-[a-z0-9]+)*$',
    'selector-max-id': 1,
    'selector-max-universal': 1,
    'selector-no-qualifying-type': [true, {
      ignore: ['attribute', 'class']
    }],

    'property-case': 'lower',
    'property-no-unknown': true,
    'declaration-empty-line-before': 'never',
    'declaration-colon-space-after': 'always',
    'declaration-colon-space-before': 'never',

    'color-hex-case': 'lower',
    'color-hex-length': 'short',
    'color-no-invalid-hex': true,
    'length-zero-no-unit': true,
    'number-leading-zero': 'always',
    'number-no-trailing-zeros': true,

    'string-quotes': 'single',
    'url-quotes': 'always',

    'function-comma-space-after': 'always',
    'function-comma-space-before': 'never',
    'function-parentheses-space-inside': 'never',
    'function-url-quotes': 'always',

    'block-opening-brace-space-before': 'always',
    'block-closing-brace-newline-after': 'always',
    'block-closing-brace-newline-before': 'always',
    'block-opening-brace-newline-after': 'always',

    'rule-empty-line-before': ['always', {
      except: ['first-nested'],
      ignore: ['after-comment']
    }],

    'comment-empty-line-before': ['always', {
      except: ['first-nested'],
      ignore: ['stylelint-commands']
    }],

    'selector-pseudo-element-no-unknown': [true, {
      ignorePseudoElements: ['deep', 'slotted', 'global']
    }],

    'at-rule-no-unknown': [true, {
      ignoreAtRules: ['tailwind', 'apply', 'variants', 'responsive', 'screen']
    }]
  },
  overrides: [
    {
      files: ['*.vue', '**/*.vue'],
      customSyntax: 'postcss-html'
    }
  ]
}