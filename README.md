# Café Hospedagem — GitHub Pages

Projeto preparado para publicação automática no GitHub Pages.

## Como publicar

1. Crie um repositório vazio no GitHub.
2. Extraia este ZIP e envie **o conteúdo da pasta** para a raiz do repositório.
3. Use a branch `main`.
4. No GitHub, acesse **Settings → Pages**.
5. Em **Build and deployment**, selecione **GitHub Actions**.
6. Aguarde a ação “Publicar site no GitHub Pages” terminar.

O endereço aparecerá na área **Settings → Pages**.

O projeto detecta automaticamente o nome do repositório. Por isso, imagens,
estilos e scripts funcionam tanto em `usuario.github.io` quanto em
`usuario.github.io/nome-do-repositorio`.

## Testar no computador

```bash
npm install
npm run dev
```

## Gerar a versão estática

```bash
npm run build
```

Os arquivos finais serão criados na pasta `out`.

Conceito visual não oficial — JN Santos Web Studio.
