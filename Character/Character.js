/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Character extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Character/costumes/costume1.svg", {
        x: 24.488527559718676,
        y: 23.742237575500866
      })
    ];

    this.sounds = [new Sound("pop", "./Character/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.BROADCAST, { name: "start" }, this.whenIReceiveStart),
      new Trigger(
        Trigger.BROADCAST,
        { name: "start" },
        this.whenIReceiveStart2
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "500 points!" },
        this.whenIReceive500Points
      )
    ];
  }

  *whenGreenFlagClicked() {
    /* TODO: Implement data_hidevariable */ null;
    this.costume = "costume1";
    this.visible = false;
  }

  *whenIReceiveStart() {
    /* TODO: Implement data_showvariable */ null;
    this.size = 100;
    this.stage.costume = 2;
    this.goto(0, 0);
    this.stage.vars.xPos = 0;
    this.stage.vars.yVar = 0;
    this.visible = true;
    while (true) {
      if (this.keyPressed("up arrow")) {
        this.y += 3;
      }
      if (this.keyPressed("down arrow")) {
        this.y += -3;
      }
      if (this.keyPressed("right arrow")) {
        this.x += 3;
      }
      if (this.keyPressed("left arrow")) {
        this.x += -3;
      }
      yield;
    }
  }

  *whenIReceiveStart2() {
    this.size = 100;
    this.stage.costume = 2;
    this.goto(0, 0);
    this.visible = true;
    while (true) {
      /* TODO: Implement looks_gotofrontback */ null;
      this.size = this.stage.vars.score + 100;
      yield;
    }
  }

  *whenIReceive500Points() {
    this.visible = false;
  }
}
