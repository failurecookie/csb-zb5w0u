/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class FinishParalax2 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./FinishParalax2/costumes/costume1.svg", {
        x: 212.707195,
        y: 168.47884
      })
    ];

    this.sounds = [new Sound("pop", "./FinishParalax2/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "500 points!" },
        this.whenIReceive500Points
      )
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    this.goto(0, 0);
  }

  *whenIReceive500Points() {
    this.visible = true;
    while (true) {
      this.goto(this.mouse.x / 10 + 0, this.mouse.y / 35 + 10);
      yield;
    }
  }
}
