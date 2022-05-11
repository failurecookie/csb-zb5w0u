import { Project } from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import Title from "./Title/Title.js";
import Character from "./Character/Character.js";
import Enemy from "./Enemy/Enemy.js";
import FinishParalax from "./FinishParalax/FinishParalax.js";
import FinishParalax2 from "./FinishParalax2/FinishParalax2.js";

const stage = new Stage({ costumeNumber: 1 });

const sprites = {
  Title: new Title({
    x: 0,
    y: 75,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true
  }),
  Character: new Character({
    x: 141,
    y: -183,
    direction: 90,
    costumeNumber: 1,
    size: 126,
    visible: false
  }),
  Enemy: new Enemy({
    x: 203,
    y: -15,
    direction: 90,
    costumeNumber: 3,
    size: 100,
    visible: false
  }),
  FinishParalax: new FinishParalax({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false
  }),
  FinishParalax2: new FinishParalax2({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false
  })
};

const project = new Project(stage, sprites);
export default project;
