# Ecológica Awards

Premiação da Comunidade da Ecológica Verde com suporte a 4 idiomas (**PT**, **EN**, **ES** e **RU**), todas as 30 categorias oficiais, player de música integrado e exportação do cartão oficial em PNG com fundo transparente para compartilhar no Discord.

## Recursos

- **30 Categorias Oficiais**: todos os jogos, atores, criadores de conteúdo, atletas e times de esports com suas artes oficiais em `public/covers/`.
- **4 Idiomas (`PT` / `EN` / `ES` / `RU`)**: seletor direto no cabeçalho (também aceita `?lang=en`, `?lang=es` ou `?lang=ru`).
- **Trilha Sonora Integrada**: arquivo `public/audio/theme.m4a` com reprodução automática e controle de play/pause e volume no canto inferior esquerdo.
- **Cartão Oficial para Discord**: download em PNG (alta resolução 2x) com cantos arredondados e fundo transparente, exibindo Avatar, Username e escolhas.

## Rodar localmente

```bash
npm install
npm run dev
```

## Publicar no GitHub Pages

O projeto já inclui `base: "./"` em `vite.config.ts` e o workflow automático em `.github/workflows/deploy.yml`:

1. Envie todos os arquivos desta pasta para o seu repositório no GitHub (branch `main` ou `master`).
2. No repositório, acesse **Settings → Pages → Build and deployment → Source** e selecione **GitHub Actions**.
3. O site será publicado automaticamente na URL `https://<seu-usuario>.github.io/<nome-do-repo>/`.
