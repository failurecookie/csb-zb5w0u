/* eslint-disable require-yield, eqeqeq */

import {
  Stage as StageBase,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Stage extends StageBase {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("backdrop1", "./Stage/costumes/backdrop1.svg", {
        x: 301.0510510510511,
        y: 223.72372372372365
      }),
      new Costume("2", "./Stage/costumes/2.svg", {
        x: 240,
        y: 182.9076576576577
      }),
      new Costume("complete", "./Stage/costumes/complete.svg", {
        x: 212.707195,
        y: 168.47884
      }),
      new Costume("backdrop2", "./Stage/costumes/backdrop2.svg", {
        x: 266.516505,
        y: 208.70871
      })
    ];

    this.sounds = [new Sound("pop", "./Stage/sounds/pop.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "500 points!" },
        this.whenIReceive500Points
      )
    ];

    this.vars.xPos = 0;
    this.vars.yVar = 0;
    this.vars.score = 0;
    this.vars.doneWithGame = "False";
    this.vars.OfClones = 0;
    this.vars.pentagonHealth = 0;
    this.vars.complete = "False";
  }

  *whenIReceive500Points() {
    this.costume = "backdrop2";
  }
}
