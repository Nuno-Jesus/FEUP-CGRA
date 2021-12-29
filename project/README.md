# CGRA 2020/2021

-----------------------

## Group T01G05

|Nome             | Número mecanográfico
|      :---:      |       :---:
|Carlos Veríssimo | up201907716
|Nuno Jesus       | up201905477

**Project Grade:** 19.3

-----------------------

## Project Notes
- Foram implementados nos controlos da interface, funcionalidades que permitem costumizar o peixe e os pilares com mais detalhe. 

  - Para o peixe foram adicionados 3 *sliders*, que controlam cada uma das componentes RGB da cor sólida do seu corpo, e um selecionador de texturas.
  - Para os pilares foi adicionado um selecionador de texturas.


- Das funcionalidades adicionais foram implementadas as algas, as algas animadas (numa classe à parte) e o lançamento de pedras.

  - As algas animadas foram feitas recorrendo a uma classe de algas à parte (**MyAnimatedAlgae**). Esta classe chama uma classe diferenciada 
  da pirâmide normal (**MyStackedPyramid**) que constrói uma pirâmide com vértices intermédios entre o vértice superior e a base. A classe
  **MyAnimatedAlgaeSet** é responsável pela criação de agrupamentos de algas animadas e pelo display desse conjunto. Devido a questões de 
  performance, fomos obrigados a colocar o shader das algas animadas em **MyScene**, o que leva a que todas as algas animadas tenham a mesma cor.
  Para compensar, tornamos a cor sólida dessas algas num gradiente verde-ciano, o que as deve tornar mais distinguíveis.

  - O lançamento de pedras é efetuado apenas quando o peixe possui uma pedra na boca, quando está no limite superior e quando está a uma distância
  arredondada de 5 unidades da periferia do ninho.

- O peixe não consegue passar além dos limites laterais da skybox, nem estar a uma altura maior que 5.0 unidades ou menor que 1.0 unidades.

------------------------------------

## Screenshots

### 1 - MyFish
![Screenshot 1a](screenshots/proj-t01g05-1a.png)
![Screenshot 1b](screenshots/proj-t01g05-1b.png)
![Screenshot 1c](screenshots/proj-t01g05-1c.png)
![Screenshot 1d](screenshots/proj-t01g05-1d.png)
![Screenshot 1e](screenshots/proj-t01g05-1e.png)

### 2 - MySeaFloor
![Screenshot 2a](screenshots/proj-t01g05-2a.png)
![Screenshot 2b](screenshots/proj-t01g05-2b.png)
![Screenshot 2c](screenshots/proj-t01g05-2c.png)

### 3 - Superfície da Água
![Screenshot 3a](screenshots/proj-t01g05-3a.png)
![Screenshot 3b](screenshots/proj-t01g05-3b.png)

### 4 - MyRock
![Screenshot 4a](screenshots/proj-t01g05-4a.png)
![Screenshot 4b](screenshots/proj-t01g05-4b.png)
![Screenshot 4c](screenshots/proj-t01g05-4c.png)
![Screenshot 4d](screenshots/proj-t01g05-4d.png)

### 5 - MyPillar
![Screenshot 5a](screenshots/proj-t01g05-5a.png)
![Screenshot 5b](screenshots/proj-t01g05-5b.png)
![Screenshot 5c](screenshots/proj-t01g05-5c.png)
![Screenshot 5d](screenshots/proj-t01g05-5d.png)

### 6 - Outros elementos
![Screenshot 6a](screenshots/proj-t01g05-6a.png)

### 7 - Recolha de Pedras
![Screenshot 7a](screenshots/proj-t01g05-7a.png)
![Screenshot 7b](screenshots/proj-t01g05-7b.png)
![Screenshot 7c](screenshots/proj-t01g05-7c.png)

### 8 - Funcionalidades Adicionais
![Screenshot 8a](screenshots/proj-t01g05-8a.png)
![Screenshot 8b](screenshots/proj-t01g05-8b.png)
![Screenshot 8c](screenshots/proj-t01g05-8c.png)
![Screenshot 8d](screenshots/proj-t01g05-8d.png)
![Screenshot 8e](screenshots/proj-t01g05-8e.png)