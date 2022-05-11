/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class FinishParalax extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./FinishParalax/costumes/costume1.svg", {
        x: 232.5,
        y: 168.81817999999998
      })
    ];

    this.sounds = [new Sound("pop", "./FinishParalax/sounds/pop.wav")];

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
    this.goto(0, 0);
    this.visible = false;
  }

  *whenIReceive500Points() {
    this.visible = true;
    while (true) {
      this.goto(this.mouse.x / 35 + 0, this.mouse.y / 35 + 0);
      yield;
    }
  }
}
