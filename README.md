Olá! Cá está meu projeto feito.

<h1>Observações iniciais:</h1>
  - O site está disponível para acesso no endereço: https://zul-project-front.vercel.app/ <br/>
  <br/>
  - Fiz a busca por dados usando tendo como fonte a tabela do Notion por causa que a páginação pelo o Datastore do pipedream não ficaria tão boa quanto ao do Notion. (ficou muito bom)<br/>
  <br/>
  - A páginação é a mesma usada na API do Notion<br/>
    ou seja, quando você fizer a primeira requisição irá ser retornado "next_cursor" indicando o id do primeiro registro da próxima página e "has_more" será true caso haja mais registros para serem paginados.<br/>
    Caso não haja mais registros o valor de "next_cursor" será null e "has_more" será falso.
    <br/>
    Caso você não passe "start_cursor" será trazido os 5 registros de cada página.

