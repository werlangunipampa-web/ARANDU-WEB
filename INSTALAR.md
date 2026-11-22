# Instalar e testar ARANDU WEB 0.1.0 (Firefox)

O ARANDU WEB é uma extensão experimental para **Mozilla Firefox**, com três rios: Favoritos, Abas e Histórico. A instalação temporária abaixo permite testar **sem mudar arquivos internos do navegador**.

## Requisitos

- Firefox **115 ou superior** (mínimo declarado no manifesto; versões específicas ainda requerem testes).
- Permissões para ler abas, favoritos e histórico: elas permitem exibir esses itens na barra lateral.
- Não é necessário instalar o ARANDU TAPE.

## Opção 1 — baixar do GitHub

1. Acesse [ARANDU-WEB no GitHub](https://github.com/werlangunipampa-web/ARANDU-WEB).
2. Clique em **Code → Download ZIP**.
3. Extraia o ZIP no computador.

## Opção 2 — baixar com Git

```bash
cd ~/Downloads
git clone https://github.com/werlangunipampa-web/ARANDU-WEB.git
```

## Carregar temporariamente no Firefox

1. Na barra de endereços, digite exatamente `about:debugging#/runtime/this-firefox`.
2. Clique em **Carregar extensão temporária**.
3. Selecione `extension/manifest.json` dentro da pasta baixada ou clonada.
4. Abra **ARANDU WEB** pelo botão de extensões ou pelo menu de barras laterais.

**Atenção:** após reiniciar o Firefox, será necessário carregar novamente a extensão temporária. Não tente instalá-la permanentemente por ZIP não assinado.

## Atalhos com a barra lateral em foco

| Atalho | Função |
|---|---|
| `Alt+1` | Favoritos |
| `Alt+2` | Abas |
| `Alt+3` | Histórico |
| `↑ / ↓` | Escolher item |
| `Enter` | Abrir / selecionar |
| `F1` | Ajuda |
| `/` | Pesquisa |
| `Esc` | Fechar ajuda ou limpar busca |

O navegador pode ter atalhos conflitantes. A atribuição da extensão `Ctrl+Shift+Y` pode ser ajustada nas configurações do Firefox.

## Instalação permanente e assinatura Mozilla

Para que o público instale o complemento de forma permanente em versões convencionais do Firefox, será necessário submetê-lo à assinatura da Mozilla (AMO). **A publicação do código no GitHub não substitui a assinatura.**

O ARANDU WEB 0.1.0 **não possui ainda reconhecimento de voz, de mãos ou de movimentos da cabeça**. Esses recursos estão no roteiro de desenvolvimento.

## Privacidade

As consultas a abas, favoritos e histórico acontecem localmente. Revise o código-fonte e as permissões antes de instalar qualquer extensão experimental.
