/**
 * @fileoverview ESLint rule to forbid negative Tailwind z-index arbitrary values.
 */

export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow negative z-index arbitrary values like z-[-1]',
    },
    schema: [],
    messages: {
      noNegativeZIndex:
        '負のz-index ({{value}}) は使用禁止です。正の整数のみ使用してください。',
    },
  },
  create(context) {
    const NEG_Z_RE = /z-\[-\d*\]/;

    function check(node, value) {
      if (typeof value === 'string' && NEG_Z_RE.test(value)) {
        context.report({
          node,
          messageId: 'noNegativeZIndex',
          data: { value: value.match(NEG_Z_RE)[0] },
        });
      }
    }

    return {
      Literal(node) {
        check(node, node.value);
      },
      // Svelte HTML attribute strings
      'SvelteLiteral'(node) {
        check(node, node.value);
      },
    };
  },
};
