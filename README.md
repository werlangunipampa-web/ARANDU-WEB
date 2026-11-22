# ARANDU WEB 🌿

**Navegação acessível para Mozilla Firefox.**

O ARANDU WEB é uma extensão experimental para Firefox, inspirada na Semente e nos três rios do ARANDU TAPE. Oferece uma barra lateral com três caminhos: **Favoritos**, **Abas** e **Histórico**, com navegação pelo teclado e interface visual simplificada.

## Versão 0.1.0 — protótipo

- Lista e abre favoritos do Firefox
- Lista e alterna abas da janela atual
- Consulta itens recentes do histórico local
- Navegação por teclado com destaque de foco
- Interface em português, sem telemetria externa

**Ainda não implementado:** reconhecimento de voz, controle por cabeça/mãos, leitura em voz alta, interação assistiva com links dentro das páginas e integração nativa com a ponte do ARANDU TAPE.

## Instalação para testes

Após disponibilizar o código da extensão neste repositório:
1. Abra `about:debugging#/runtime/this-firefox` no Firefox.
2. Clique em **Carregar extensão temporária**.
3. Selecione `extension/manifest.json`.
4. Abra a barra lateral **ARANDU WEB**.

Extensões temporárias são descarregadas quando o Firefox reinicia. Distribuição permanente requer assinatura da Mozilla.

## Privacidade

As APIs de abas, favoritos e histórico são usadas localmente pela extensão. A versão experimental não envia esses dados para serviços de terceiros.

## Código aberto

Projeto desenvolvido para ampliar as possibilidades de interação com navegadores. Licença MIT (arquivo LICENSE na distribuição de código).

## Projeto relacionado

[ARANDU TAPE](https://github.com/werlangunipampa-web/ARANDU-TAPE) — ambiente gráfico adaptativo para GNOME.

> Tecnologia que se adapta às possibilidades humanas.
