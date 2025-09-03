module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // Uma nova funcionalidade
        'fix',      // Correção de bug
        'docs',     // Mudanças na documentação
        'style',    // Mudanças que não afetam o código (espaços, formatação, etc)
        'refactor', // Refatoração de código que não corrige bugs nem adiciona funcionalidades
        'perf',     // Mudança que melhora performance
        'test',     // Adiciona ou corrige testes
        'chore',    // Mudanças no processo de build ou ferramentas auxiliares
        'ci',       // Mudanças nos arquivos de configuração de CI
        'build',    // Mudanças que afetam o sistema de build ou dependências externas
        'revert',   // Reverte um commit anterior
      ],
    ],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 72],
    'body-leading-blank': [1, 'always'],
    'body-max-line-length': [2, 'always', 100],
    'footer-leading-blank': [1, 'always'],
    'footer-max-line-length': [2, 'always', 100],
  },
};