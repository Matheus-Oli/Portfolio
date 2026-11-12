# Portfólio — Matheus Oliveira

Portfólio pessoal de Matheus Oliveira, desenvolvedor web full stack em Vitória, ES.

## Tecnologias

- [Next.js 16](https://nextjs.org/) (App Router) com React 19 e TypeScript
- Tailwind CSS 4 e CSS próprio
- [GSAP](https://gsap.com/) + ScrollTrigger para as animações de entrada
- [Lenis](https://lenis.darkroom.engineering/) para a rolagem suave
- Fonte Space Grotesk via `next/font`

## Rodando localmente

Requer Node.js 20.9 ou superior.

```bash
npm install
npm run dev      # http://localhost:3000
```

Outros comandos:

```bash
npm run build    # build de produção
npm start        # serve o build de produção
npm run check    # lint + tipos + build
```

## Páginas

| Rota | Conteúdo |
|---|---|
| `/` | Home: sobre, habilidades, experiência, projetos, formação e contato |
| `/work` | Lista de todos os projetos |
| `/work/[slug]` | Página de cada projeto (gerada no build a partir dos dados) |

## Onde editar o conteúdo

- `src/components/sites/matheus/content.ts`: perfil, textos da home, habilidades, experiência e formação
- `src/components/sites/matheus/projects.ts`: projetos (home, `/work` e páginas de detalhe)
- `public/sites/matheus/`: fotos, ícones e capturas de tela

### Adicionar um projeto

1. Coloque as capturas em `public/sites/matheus/projects/`.
2. Adicione um item em `projects` no `projects.ts` (`slug`, `name`, `category`, `tagline`, `lede`, `screenshots`, `points`, `stack`, `links` e os campos opcionais).
3. A página `/work/<slug>`, o item em `/work` e o card na home aparecem no próximo build, na ordem do array.

### Animações

- `className="reveal"`: o bloco sobe com fade ao entrar na tela (`reveal--sm` para um deslocamento menor).
- `data-reveal-group` no pai + `className="reveal-item"` nos filhos: itens pequenos em sequência.
- `<MaskWords text="..." />`: texto que sobe por trás de uma máscara ao carregar.
- Quem ativa "reduzir movimento" no sistema vê tudo sem animação.
