# Arquitetura e acessibilidade

## Motivação

Uma pessoa pode operar o computador por mouse, teclado, fala, movimento do pescoço ou movimento da mão. O ARANDU WEB busca oferecer **uma única estrutura navegável** para diferentes modalidades, sem tratar acessibilidade como um modo secundário.

## Implementado em 0.1.0

A extensão usa a API WebExtensions do Firefox. `sidebar.js` controla seleção e ativação; `core.js` contém operações puras de navegação; o Firefox fornece abas, favoritos e histórico. Nenhum acesso remoto é necessário.

## Evolução planejada

1. Adaptador de intenções (`river:tabs`, `node:next`, `node:activate`, `help:open`), comum a teclado e dispositivos assistivos.
2. Leitura facilitada de conteúdos e navegação pelos elementos semânticos acessíveis das páginas, respeitando limitações da API e páginas protegidas.
3. Reconhecimento local de voz, opcional e sob consentimento.
4. Rastreamento de movimentos de cabeça e mãos com calibração individual, opção de seleção por permanência e botão de emergência.
5. Testes com tecnologias assistivas e pessoas com diferentes necessidades motoras.

### Precauções

Não ligar microfone ou câmera automaticamente; não registrar histórico de navegação em servidores; não assumir que um comando de abertura corresponde a sucesso visual; oferecer sempre um caminho para cancelar e pausar. Modos de redução de movimento e texto legível devem ser considerados na evolução.
