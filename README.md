# ARANDU WEB 🌿

**Navegação acessível para Firefox — inspirado na Semente e nos três rios do ARANDU TAPE.**

ARANDU WEB é uma extensão **experimental e de código aberto** que oferece uma barra lateral com três caminhos: **Favoritos**, **Abas** e **Histórico**. A interface privilegia clareza visual, teclado e foco perceptível. Não substitui o Firefox nem interfere na renderização dos sites.

## Funcionalidades da versão 0.1.0

- Favoritos: lista de sites salvos no navegador.
- Abas: navegação e ativação das abas da janela atual.
- Histórico: itens recentes (até 150 resultados, janela de 90 dias).
- Busca no rio selecionado, Semente para recolher/expandir lista, ajuda acessível por F1.
- Navegação local por teclado, sem serviços externos ou telemetria.
- Interface em português e paleta botânica de alto contraste.

**Não implementado:** reconhecimento de voz, movimentos de cabeça/mãos, leitura em voz alta, controle de links dentro das páginas e integração com a ponte do ARANDU TAPE. Essas são etapas futuras; não devem ser descritas como recursos disponíveis.

## Testar no Firefox (instalação temporária)

1. Descompacte `ARANDU-WEB-0.1.0-source.zip` (ou utilize a pasta `extension/` deste repositório).
2. No Firefox, acesse `about:debugging`.
3. Selecione **Este Firefox** → **Carregar extensão temporária**.
4. Escolha `extension/manifest.json`.
5. Abra o botão da extensão **ARANDU WEB**, na barra do Firefox, ou encontre-a no menu de barras laterais.

A instalação temporária precisa ser repetida depois que o Firefox reiniciar. **Para instalar de forma permanente no Firefox de distribuição normal, a extensão precisa de assinatura da Mozilla.** Não é necessário desativar verificações de segurança.

## Atalhos dentro da barra lateral

| Atalho | Ação |
|---|---|
| `Alt+1`, `Alt+2`, `Alt+3` | Favoritos, Abas, Histórico |
| `↑` / `↓` | Percorrer itens |
| `Enter` | Abrir o item focalizado |
| `/` | Campo de busca (fora de outros campos) |
| `F1` | Ajuda |
| `Esc` | Fechar ajuda ou limpar busca |

O atalho global sugerido `Ctrl+Shift+Y` pode entrar em conflito com atalhos existentes: consulte e altere nas configurações de atalhos de extensões do Firefox.

## Segurança e privacidade

As permissões `tabs`, `bookmarks` e `history` são utilizadas para apresentar os três rios. O código não envia dados a servidores. O histórico é consultado somente quando o rio Histórico é selecionado. **Como o projeto é público, qualquer pessoa pode auditar o código.**

## Estrutura

- `extension/` — extensão Firefox Manifest V2.
- `docs/` — arquitetura, acessibilidade e evolução.
- `tests/` — testes unitários do núcleo.

## Desenvolvimento

Necessário Node.js para testes:

```sh
node --test tests/*.test.js
```

Licença: MIT (ver `LICENSE`). Versão 0.1.0 é um protótipo que precisa de avaliação de acessibilidade com usuários e testes em diferentes versões do Firefox.
