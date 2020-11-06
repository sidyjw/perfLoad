# Descrição

Nesse projeto foi criado um programa em NodeJS + React + Socket.IO para
medir a performance ao mesmo tempo em que mostra o tempo de atividade
de um computador.

# Arquitetura

Um servidor central, que se encontra na pasta ./server, irá receber os dados em tempo real de um programa escrito em NodeJS, que servirá
como um cliente e será instalado na máquina que queremos medir a performance. Esse cliente esta na pasta ./nodeClient.

Para que possamos visualizar esses dados, foi feito uma UI utilizando
ReactJS que ficará escutando os dados vindo do servidor central.

# Detalhes

Para aumentar a performance do servidor, foi utilizado o módulo cluster
do NodeJS...
